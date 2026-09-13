const express = require('express');
const asyncHandler = require('express-async-handler');
const { getClasses } = require('../controllers/classController');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

router.get('/', protect, authorize('admin', 'finance'), asyncHandler(getClasses));

module.exports = router;
