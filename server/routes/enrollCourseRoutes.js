const express = require('express');
const router = express.Router();
const {
  enrollCourse
} = require('../controllers/enrollCourseController');

const { body } = require('express-validator');

// Validation middleware
const validateEnrollCourse = [
  body('studentId').notEmpty().withMessage('Please select a student.'),
  body('courseId').notEmpty().withMessage('Please select a course.'),
  body('coachingCenterId').notEmpty().withMessage('Please select a coaching center.'),
];

// router.get('/', getAllCourses);
// router.get('/:id', getCourseById);
router.post('/', validateEnrollCourse, enrollCourse);
// router.put('/:id', validateCoachingCenter, updateCourse);
// router.delete('/:id', deleteCourse);

module.exports = router;



// GET /api/coaching-centers?page=2&duration=2