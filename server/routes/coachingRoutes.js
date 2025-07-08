const express = require('express');
const router = express.Router();
const {
  getAllCoachingCenters,
  getCoachingCenterById,
  createCoachingCenter,
  updateCoachingCenter,
  deleteCoachingCenter,
} = require('../controllers/coachingController');

const { body } = require('express-validator');

// Validation middleware
const validateCoachingCenter = [
  body('name').notEmpty().withMessage('Name is required'),
  body('thumbnail').notEmpty().withMessage('Thumbnail is required'),
  body('city').notEmpty().withMessage('City is required'),
  body('rating').optional().isNumeric().withMessage('Rating must be a number'),
  body('minFee').isNumeric().withMessage('Minimum fee must be a number'),
  body('maxFee').isNumeric().withMessage('Maximum fee must be a number'),
];

router.get('/', getAllCoachingCenters);
router.get('/:id', getCoachingCenterById);
router.post('/', validateCoachingCenter, createCoachingCenter);
router.put('/:id', validateCoachingCenter, updateCoachingCenter);
router.delete('/:id', deleteCoachingCenter);

module.exports = router;



// GET /api/coaching-centers?page=2&city=Lahore&rating=4&minFee=10000