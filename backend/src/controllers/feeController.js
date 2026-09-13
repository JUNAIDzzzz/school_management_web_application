const Student = require('../models/Student');
const FeeRecord = require('../models/FeeRecord');
const FeeStructure = require('../models/FeeStructure');

const currentMonthYear = () => {
  const now = new Date();
  return { month: FeeRecord.MONTHS[now.getMonth()], year: now.getFullYear() };
};

// Builds the fee list for a month by combining every matching student with its
// fee record for that month (if one exists yet). A student with no record yet
// is still shown as "Unpaid" using the fee structure amount, but nothing is
// written to the database until the fee is actually marked as paid.
const buildFeeList = async ({ month, year, classId, studentType, search }) => {
  const studentFilter = {};
  if (classId) studentFilter.class = classId;
  if (studentType) studentFilter.studentType = studentType;
  if (search) {
    studentFilter.$or = [
      { name: { $regex: search, $options: 'i' } },
      { admissionNumber: { $regex: search, $options: 'i' } },
    ];
  }

  const [students, feeStructures] = await Promise.all([
    Student.find(studentFilter).populate('class', 'name number'),
    FeeStructure.find().populate('class', 'name number'),
  ]);

  const structureMap = new Map(
    feeStructures.map((fs) => [`${fs.class._id}_${fs.studentType}`, fs.monthlyFee])
  );

  const studentIds = students.map((s) => s._id);
  const records = await FeeRecord.find({ student: { $in: studentIds }, month, year: Number(year) });
  const recordMap = new Map(records.map((r) => [String(r.student), r]));

  return students.map((student) => {
    const record = recordMap.get(String(student._id));
    const fallbackAmount = structureMap.get(`${student.class._id}_${student.studentType}`) || 0;

    return {
      id: record ? record._id : null,
      student: { id: student._id, name: student.name, admissionNumber: student.admissionNumber },
      class: student.class,
      studentType: student.studentType,
      month,
      year: Number(year),
      amount: record ? record.amount : fallbackAmount,
      paymentStatus: record ? record.paymentStatus : 'Unpaid',
      paymentDate: record ? record.paymentDate : null,
    };
  });
};

// GET /api/fees
const getFees = async (req, res) => {
  const { month, year, classId, studentType, status, search } = req.query;
  const defaults = currentMonthYear();

  const list = await buildFeeList({
    month: month || defaults.month,
    year: year || defaults.year,
    classId,
    studentType,
    search,
  });

  const filtered = status && status !== 'All' ? list.filter((r) => r.paymentStatus === status) : list;

  res.json({ month: month || defaults.month, year: Number(year) || defaults.year, records: filtered });
};

// POST /api/fees/mark-paid
// body: { studentId, month, year, paymentDate? }
const markFeePaid = async (req, res) => {
  const { studentId, month, year, paymentDate } = req.body;

  if (!studentId || !month || !year) {
    return res.status(400).json({ message: 'studentId, month and year are required' });
  }

  const student = await Student.findById(studentId).populate('class', 'name number');
  if (!student) return res.status(404).json({ message: 'Student not found' });

  const structure = await FeeStructure.findOne({ class: student.class._id, studentType: student.studentType });
  const amount = structure ? structure.monthlyFee : 0;

  // Upsert enforces "one fee record per student per month" (unique index) and
  // ensures marking one month paid never touches any other month's record.
  const record = await FeeRecord.findOneAndUpdate(
    { student: student._id, month, year: Number(year) },
    {
      student: student._id,
      class: student.class._id,
      studentType: student.studentType,
      month,
      year: Number(year),
      amount,
      paymentStatus: 'Paid',
      paymentDate: paymentDate ? new Date(paymentDate) : new Date(),
      recordedBy: req.user._id,
    },
    { upsert: true, new: true, setDefaultsOnInsert: true }
  );

  res.json({ record });
};

// PATCH /api/fees/:id
// Allows Admin/Finance to correct an existing fee record (amount, status, date).
const updateFeeRecord = async (req, res) => {
  const { amount, paymentStatus, paymentDate } = req.body;

  const record = await FeeRecord.findById(req.params.id);
  if (!record) return res.status(404).json({ message: 'Fee record not found' });

  if (amount !== undefined) record.amount = amount;
  if (paymentStatus !== undefined) {
    record.paymentStatus = paymentStatus;
    if (paymentStatus === 'Paid' && !record.paymentDate) {
      record.paymentDate = paymentDate ? new Date(paymentDate) : new Date();
    }
    if (paymentStatus === 'Unpaid') {
      record.paymentDate = null;
    }
  }
  if (paymentDate !== undefined && paymentStatus === undefined) {
    record.paymentDate = paymentDate ? new Date(paymentDate) : null;
  }
  record.recordedBy = req.user._id;

  await record.save();
  res.json({ record });
};

module.exports = { getFees, markFeePaid, updateFeeRecord, buildFeeList, currentMonthYear };
