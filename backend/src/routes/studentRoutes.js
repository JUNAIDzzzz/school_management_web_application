const express = require('express');
const asyncHandler = require('express-async-handler');
const {
  getStudents,
  getStudentById,
  createStudent,
  updateStudent,
  deleteStudent,
} = require('../controllers/studentController');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

router.use(protect, authorize('admin', 'finance'));

router.get('/', asyncHandler(getStudents));
router.get('/:id', asyncHandler(getStudentById));

// Only Admin can add, edit, or remove students.
router.post('/', authorize('admin'), asyncHandler(createStudent));
router.put('/:id', authorize('admin'), asyncHandler(updateStudent));
router.delete('/:id', authorize('admin'), asyncHandler(deleteStudent));

module.exports = router;
