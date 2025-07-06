const CoachingCenter = require('../models/CoachingCenter');

// GET /api/coaching-centers
exports.getAllCoachingCenters = async (req, res) => {
  try {
    const { city, rating, minFee, page = 1 } = req.query;
    const limit = 5;
    const skip = (page - 1) * limit;

    let filters = {};

    if (city) filters.city = city;
    if (rating) filters.rating = { $gte: Number(rating) };
    if (minFee) filters.minFee = { $gte: Number(minFee) };

    const total = await CoachingCenter.countDocuments(filters);
    const centers = await CoachingCenter.find(filters)
      .populate('courses')
      .skip(skip)
      .limit(limit);

    res.status(200).json({
      total,
      page: Number(page),
      totalPages: Math.ceil(total / limit),
      data: centers,
    });
  } catch (err) {
    res.status(500).json({ message: 'Server Error', error: err.message });
  }
};

// GET /api/coaching-centers/:id
exports.getCoachingCenterById = async (req, res) => {
  try {
    const center = await CoachingCenter.findById(req.params.id).populate('courses');
    if (!center) {
      return res.status(404).json({ message: 'Coaching Center not found' });
    }
    res.status(200).json(center);
  } catch (err) {
    res.status(500).json({ message: 'Server Error', error: err.message });
  }
};

// POST /api/coaching-centers
exports.createCoachingCenter = async (req, res) => {
  try {
    const { name, city, rating, reviews, minFee, maxFee, courses } = req.body;

    const newCenter = new CoachingCenter({
      name,
      city,
      rating,
      reviews,
      minFee,
      maxFee,
      courses,
    });

    const saved = await newCenter.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ message: 'Failed to create coaching center', error: err.message });
  }
};

// PUT /api/coaching-centers/:id
exports.updateCoachingCenter = async (req, res) => {
  try {
    const updated = await CoachingCenter.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    }).populate('courses');

    if (!updated) {
      return res.status(404).json({ message: 'Coaching Center not found' });
    }

    res.status(200).json(updated);
  } catch (err) {
    res.status(400).json({ message: 'Failed to update', error: err.message });
  }
};

// DELETE /api/coaching-centers/:id
exports.deleteCoachingCenter = async (req, res) => {
  try {
    const deleted = await CoachingCenter.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ message: 'Coaching Center not found' });
    }

    res.status(200).json({ message: 'Coaching Center deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Delete failed', error: err.message });
  }
};