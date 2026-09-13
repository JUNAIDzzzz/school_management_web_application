const express = require('express');
const asyncHandler = require('express-async-handler');
const {
  getFinanceUsers,
  createFinanceUser,
  updateFinanceUser,
  deleteFinanceUser,
} = require('../controllers/financeUserController');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

// Only Admin manages Finance users (business rule: Finance cannot manage Admin accounts,
// and only Admin is allowed to manage Finance users at all).
router.use(protect, authorize('admin'));

router.get('/', asyncHandler(getFinanceUsers));
router.post('/', asyncHandler(createFinanceUser));
router.put('/:id', asyncHandler(updateFinanceUser));
router.delete('/:id', asyncHandler(deleteFinanceUser));

module.exports = router;
