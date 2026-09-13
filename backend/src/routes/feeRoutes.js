const express = require('express');
const asyncHandler = require('express-async-handler');
const { getFees, markFeePaid, updateFeeRecord } = require('../controllers/feeController');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

router.use(protect, authorize('admin', 'finance'));

router.get('/', asyncHandler(getFees));
router.post('/mark-paid', asyncHandler(markFeePaid));
router.patch('/:id', asyncHandler(updateFeeRecord));

module.exports = router;
