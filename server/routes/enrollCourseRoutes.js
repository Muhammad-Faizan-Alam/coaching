const express = require('express');
const router = express.Router();
const {
  enrollCourse,
  updateEnrollCourse,
  getAllEnrollCourses,
  getEnrollCourseByStudentId,
  getEnrollCourseByCourse,
  getEnrollCourseByCenter,
  deleteEnrollCourse,
} = require('../controllers/enrollCourseController');

const { body } = require('express-validator');

// Validation middleware
const validateEnrollCourse = [
  body('studentId').notEmpty().withMessage('Please select a student.'),
  body('name').notEmpty().withMessage('Name is required.'),
  body('email').isEmail().withMessage('Please enter a valid email address.'),
  body('phone').notEmpty().withMessage('Phone number is required.'),
  body('address').notEmpty().withMessage('Address is required.'),
  body('courseId').notEmpty().withMessage('Please select a course.'),
  body('coachingCenterId').notEmpty().withMessage('Please select a coaching center.'),
];

router.get('/', getAllEnrollCourses);
router.get('/studentId/:id', getEnrollCourseByStudentId);
router.get('/course/:id', getEnrollCourseByCourse);
router.get('/center/:id', getEnrollCourseByCenter);
router.post('/', validateEnrollCourse, enrollCourse);
router.put('/:id', validateEnrollCourse, updateEnrollCourse);
router.delete('/:id', deleteEnrollCourse);

module.exports = router;



// GET /api/coaching-centers?page=2&duration=2