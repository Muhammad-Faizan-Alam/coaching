const CoachingCenter = require('../models/CoachingCenter');
const { validationResult } = require('express-validator');

// GET /api/coaching-centers
exports.getAllCoachingCenters = async (req, res, next) => {
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
    next(err);
  }
};

// GET /api/coaching-centers/:id
exports.getCoachingCenterById = async (req, res, next) => {
  try {
    const center = await CoachingCenter.findById(req.params.id).populate('courses');
    if (!center) {
      const error = new Error('Coaching Center not found');
      error.statusCode = 404;
      return next(error);
    }
    res.status(200).json(center);
  } catch (err) {
    next(err);
  }
};

// POST /api/coaching-centers
exports.createCoachingCenter = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error('Validation Failed');
    error.statusCode = 422;
    error.errors = errors.array();
    return next(error);
  }

  try {
    const { name, thumbnail, city, rating, reviews, minFee, maxFee, courses } = req.body;

    const newCenter = new CoachingCenter({
      name,
      thumbnail,
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
    next(err);
  }
};

// PUT /api/coaching-centers/:id
exports.updateCoachingCenter = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error('Validation Failed');
    error.statusCode = 422;
    error.errors = errors.array();
    return next(error);
  }

  try {
    const updated = await CoachingCenter.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    }).populate('courses');

    if (!updated) {
      const error = new Error('Coaching Center not found');
      error.statusCode = 404;
      return next(error);
    }

    res.status(200).json(updated);
  } catch (err) {
    next(err);
  }
};

// DELETE /api/coaching-centers/:id
exports.deleteCoachingCenter = async (req, res, next) => {
  try {
    const deleted = await CoachingCenter.findByIdAndDelete(req.params.id);

    if (!deleted) {
      const error = new Error('Coaching Center not found');
      error.statusCode = 404;
      return next(error);
    }

    res.status(200).json({ message: 'Coaching Center deleted successfully' });
  } catch (err) {
    next(err);
  }
};