const express = require('express');
const { body } = require('express-validator');
const {
  createReview,
  getReviewsByCenter,
  deleteReview,
} = require('../controllers/reviewController');

const router = express.Router();

// Validation
const validateReview = [
  body('user').notEmpty().withMessage('User ID is required'),
  body('coachingCenter').notEmpty().withMessage('Coaching Center ID is required'),
  body('rating').isNumeric().withMessage('Rating must be a number'),
];

// Routes
router.post('/', validateReview, createReview);
router.get('/center/:coachingCenterId', getReviewsByCenter);
router.delete('/:id', deleteReview);

module.exports = router