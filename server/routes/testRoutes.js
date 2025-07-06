const express = require('express');
const router = express.Router();
const {
  getAllTests,
  getTestById,
  createTest,
  updateTest,
  deleteTest
} = require('../controllers/testController');

const { body } = require('express-validator');

// Validation middleware
const validateCoachingCenter = [
  body('title').notEmpty().withMessage('Title is required'),
  body('year').optional().isNumeric().withMessage('Year must be a number'),
  body('hours').optional().isNumeric().withMessage('Hours must be a number'),
  body('questions').optional().isNumeric().withMessage('Questions must be a number'),
];

router.get('/', getAllTests);
router.get('/:id', getTestById);
router.post('/', validateCoachingCenter, createTest);
router.put('/:id', validateCoachingCenter, updateTest);
router.delete('/:id', deleteTest);

module.exports = router;



// GET /api/tests?page=2