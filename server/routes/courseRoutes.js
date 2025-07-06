const express = require('express');
const router = express.Router();
const {
  getAllCourses,
  getCourseById,
  createCourse,
  updateCourse,
  deleteCourse
} = require('../controllers/courseController');

const { body } = require('express-validator');

// Validation middleware
const validateCoachingCenter = [
  body('title').notEmpty().withMessage('Title is required'),
  body('duration').optional().isNumeric().withMessage('Duration must be a number'),
  body('learners').optional().isNumeric().withMessage('Learners must be a number'),
];

router.get('/', getAllCourses);
router.get('/:id', getCourseById);
router.post('/', validateCoachingCenter, createCourse);
router.put('/:id', validateCoachingCenter, updateCourse);
router.delete('/:id', deleteCourse);

module.exports = router;



// GET /api/coaching-centers?page=2&duration=2