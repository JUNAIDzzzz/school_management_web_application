const express = require('express');
const asyncHandler = require('express-async-handler');
const { login, me } = require('../controllers/authController');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.post('/login', asyncHandler(login));
router.get('/me', protect, asyncHandler(me));

module.exports = router;
