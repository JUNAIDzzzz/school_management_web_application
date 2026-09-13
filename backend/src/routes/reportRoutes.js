const express = require('express');
const asyncHandler = require('express-async-handler');
const { getMonthlyReport } = require('../controllers/reportController');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

router.get('/monthly', protect, authorize('admin', 'finance'), asyncHandler(getMonthlyReport));

module.exports = router;
