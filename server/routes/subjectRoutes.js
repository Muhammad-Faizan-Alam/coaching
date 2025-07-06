const express = require('express');
const router = express.Router();
const {
  getAllSubjects,
  getSubjectById,
  createSubject,
  updateSubject,
  deleteSubject
} = require('../controllers/subjectController');

const { body } = require('express-validator');

// Validation middleware
const validateCoachingCenter = [
  body('title').notEmpty().withMessage('Title is required')
];

router.get('/', getAllSubjects);
router.get('/:id', getSubjectById);
router.post('/', validateCoachingCenter, createSubject);
router.put('/:id', validateCoachingCenter, updateSubject);
router.delete('/:id', deleteSubject);

module.exports = router;



// GET /api/subjects?page=2