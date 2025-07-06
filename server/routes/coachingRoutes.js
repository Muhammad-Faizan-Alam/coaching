const express = require('express');
const router = express.Router();
const {
  getAllCoachingCenters,
  getCoachingCenterById,
  createCoachingCenter,
  updateCoachingCenter,
  deleteCoachingCenter
} = require('../controllers/coachingController');

router.get('/', getAllCoachingCenters);
router.get('/:id', getCoachingCenterById);
router.post('/', createCoachingCenter);
router.put('/:id', updateCoachingCenter);
router.delete('/:id', deleteCoachingCenter);

module.exports = router;



// GET /api/coaching-centers?page=2&city=Lahore&rating=4&minFee=10000