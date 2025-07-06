const express = require('express');
const router = express.Router();
const {
  getAllTests,
  getTestById,
  createTest,
  updateTest,
  deleteTest
} = require('../controllers/testController');

router.get('/', getAllTests);
router.get('/:id', getTestById);
router.post('/', createTest);
router.put('/:id', updateTest);
router.delete('/:id', deleteTest);

module.exports = router;



// GET /api/tests?page=2