const express = require('express');
const { body } = require('express-validator');
const {
  registerUser,
  addCourse,
  addCoachingCenter,
  updateUser,
} = require('../controllers/userController');

const router = express.Router();

// Validation for registration
const validateUser = [
  body('username').notEmpty().withMessage('Username is required'),
  body('profileImage').notEmpty().withMessage('Profile image is required'),
  body('email').isEmail().withMessage('Valid email is required'),
];

// Register user
router.post('/register', validateUser, registerUser);

// Add course to user
router.put('/:id/add-course', addCourse);

// Add coaching center to user
router.put('/:id/add-coaching-center', addCoachingCenter);

// Update user info
router.put('/:id/update', updateUser);

module.exports = router;