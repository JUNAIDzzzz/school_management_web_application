const Student = require('../models/Student');
const Class = require('../models/Class');

// GET /api/students?search=&classId=&studentType=&page=&limit=
const getStudents = async (req, res) => {
  const { search, classId, studentType, page = 1, limit = 20 } = req.query;

  const filter = {};
  if (classId) filter.class = classId;
  if (studentType) filter.studentType = studentType;
  if (search) {
    filter.$or = [
      { name: { $regex: search, $options: 'i' } },
      { admissionNumber: { $regex: search, $options: 'i' } },
    ];
  }

  const pageNum = Math.max(parseInt(page, 10) || 1, 1);
  const limitNum = Math.min(Math.max(parseInt(limit, 10) || 20, 1), 200);

  const [students, total] = await Promise.all([
    Student.find(filter)
      .populate('class', 'name number')
      .sort({ createdAt: -1 })
      .skip((pageNum - 1) * limitNum)
      .limit(limitNum),
    Student.countDocuments(filter),
  ]);

  res.json({
    students,
    pagination: { total, page: pageNum, limit: limitNum, pages: Math.ceil(total / limitNum) },
  });
};

// GET /api/students/:id
const getStudentById = async (req, res) => {
  const student = await Student.findById(req.params.id).populate('class', 'name number');
  if (!student) return res.status(404).json({ message: 'Student not found' });
  res.json({ student });
};

// POST /api/students
const createStudent = async (req, res) => {
  const { name, admissionNumber, parentName, contactNumber, class: classId, studentType } = req.body;

  if (!name || !admissionNumber || !parentName || !contactNumber || !classId || !studentType) {
    return res.status(400).json({ message: 'All student fields are required' });
  }

  const classExists = await Class.findById(classId);
  if (!classExists) return res.status(400).json({ message: 'Invalid class selected' });

  const student = await Student.create({
    name,
    admissionNumber,
    parentName,
    contactNumber,
    class: classId,
    studentType,
  });

  const populated = await student.populate('class', 'name number');
  res.status(201).json({ student: populated });
};

// PUT /api/students/:id
const updateStudent = async (req, res) => {
  const { name, admissionNumber, parentName, contactNumber, class: classId, studentType } = req.body;

  const student = await Student.findById(req.params.id);
  if (!student) return res.status(404).json({ message: 'Student not found' });

  if (classId) {
    const classExists = await Class.findById(classId);
    if (!classExists) return res.status(400).json({ message: 'Invalid class selected' });
    student.class = classId;
  }

  if (name !== undefined) student.name = name;
  if (admissionNumber !== undefined) student.admissionNumber = admissionNumber;
  if (parentName !== undefined) student.parentName = parentName;
  if (contactNumber !== undefined) student.contactNumber = contactNumber;
  if (studentType !== undefined) student.studentType = studentType;

  await student.save();
  const populated = await student.populate('class', 'name number');
  res.json({ student: populated });
};

// DELETE /api/students/:id
const deleteStudent = async (req, res) => {
  const student = await Student.findByIdAndDelete(req.params.id);
  if (!student) return res.status(404).json({ message: 'Student not found' });
  res.json({ message: 'Student removed successfully' });
};

module.exports = { getStudents, getStudentById, createStudent, updateStudent, deleteStudent };
