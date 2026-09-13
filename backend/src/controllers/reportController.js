const Class = require('../models/Class');
const { buildFeeList, currentMonthYear } = require('./feeController');

// GET /api/reports/monthly?month=&year=
const getMonthlyReport = async (req, res) => {
  const defaults = currentMonthYear();
  const month = req.query.month || defaults.month;
  const year = Number(req.query.year) || defaults.year;

  const [feeList, classes] = await Promise.all([buildFeeList({ month, year }), Class.find().sort({ number: 1 })]);

  const totalStudents = feeList.length;
  const paidStudents = feeList.filter((r) => r.paymentStatus === 'Paid').length;
  const unpaidStudents = totalStudents - paidStudents;
  const expectedFees = feeList.reduce((sum, r) => sum + r.amount, 0);
  const collectedFees = feeList.filter((r) => r.paymentStatus === 'Paid').reduce((sum, r) => sum + r.amount, 0);
  const pendingFees = expectedFees - collectedFees;

  const classSummary = classes.map((cls) => {
    const rows = feeList.filter((r) => String(r.class._id) === String(cls._id));
    const classPaid = rows.filter((r) => r.paymentStatus === 'Paid');
    const classExpected = rows.reduce((sum, r) => sum + r.amount, 0);
    const classCollected = classPaid.reduce((sum, r) => sum + r.amount, 0);

    return {
      class: { id: cls._id, name: cls.name, number: cls.number },
      totalStudents: rows.length,
      paidStudents: classPaid.length,
      unpaidStudents: rows.length - classPaid.length,
      expectedFees: classExpected,
      collectedFees: classCollected,
      pendingFees: classExpected - classCollected,
    };
  });

  res.json({
    month,
    year,
    totalStudents,
    expectedFees,
    collectedFees,
    pendingFees,
    paidStudents,
    unpaidStudents,
    classSummary,
  });
};

module.exports = { getMonthlyReport };
