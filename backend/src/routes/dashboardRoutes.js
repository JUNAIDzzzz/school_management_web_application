const express = require('express');
const asyncHandler = require('express-async-handler');
const { getAdminDashboard, getFinanceDashboard } = require('../controllers/dashboardController');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

router.get('/admin', protect, authorize('admin'), asyncHandler(getAdminDashboard));
router.get('/finance', protect, authorize('admin', 'finance'), asyncHandler(getFinanceDashboard));

module.exports = router;
