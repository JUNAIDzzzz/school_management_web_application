const Student = require('../models/Student');
const Class = require('../models/Class');
const User = require('../models/User');
const FeeRecord = require('../models/FeeRecord');
const { buildFeeList, currentMonthYear } = require('./feeController');

// GET /api/dashboard/admin
const getAdminDashboard = async (req, res) => {
  const { month, year } = currentMonthYear();

  const [totalStudents, totalClasses, financeUsersCount, feeList, totalFeesCollectedAgg] = await Promise.all([
    Student.countDocuments(),
    Class.countDocuments(),
    User.countDocuments({ role: 'finance' }),
    buildFeeList({ month, year }),
    FeeRecord.aggregate([
      { $match: { paymentStatus: 'Paid' } },
      { $group: { _id: null, total: { $sum: '$amount' } } },
    ]),
  ]);

  const paidStudents = feeList.filter((r) => r.paymentStatus === 'Paid').length;
  const unpaidStudents = feeList.length - paidStudents;

  res.json({
    month,
    year,
    totalStudents,
    totalClasses,
    financeUsersCount,
    paidStudents,
    unpaidStudents,
    totalFeesCollected: totalFeesCollectedAgg[0]?.total || 0,
  });
};

// GET /api/dashboard/finance?month=&year=
const getFinanceDashboard = async (req, res) => {
  const defaults = currentMonthYear();
  const month = req.query.month || defaults.month;
  const year = Number(req.query.year) || defaults.year;

  const [totalStudents, feeList] = await Promise.all([
    Student.countDocuments(),
    buildFeeList({ month, year }),
  ]);

  const paidStudents = feeList.filter((r) => r.paymentStatus === 'Paid').length;
  const unpaidStudents = feeList.length - paidStudents;
  const expectedFees = feeList.reduce((sum, r) => sum + r.amount, 0);
  const collectedFees = feeList.filter((r) => r.paymentStatus === 'Paid').reduce((sum, r) => sum + r.amount, 0);
  const pendingFees = expectedFees - collectedFees;

  res.json({
    month,
    year,
    totalStudents,
    expectedFees,
    collectedFees,
    pendingFees,
    paidStudents,
    unpaidStudents,
  });
};

module.exports = { getAdminDashboard, getFinanceDashboard };
