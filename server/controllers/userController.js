const User = require('../models/User');
const { validationResult } = require('express-validator');

// POST /api/users/register
exports.registerUser = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error('Validation Failed');
    error.statusCode = 422;
    error.errors = errors.array();
    return next(error);
  }

  try {
    const { username, profileImage, email } = req.body;

    const user = new User({ username, profileImage, email });
    const saved = await user.save();
    res.status(201).json(saved);
  } catch (err) {
    next(err);
  }
};

// PUT /api/users/:id/add-course
exports.addCourse = async (req, res, next) => {
  try {
    const { courseId } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { $addToSet: { courses: courseId } }, // prevents duplicates
      { new: true }
    ).populate('courses coachingCenters');

    if (!updatedUser) {
      const error = new Error('User not found');
      error.statusCode = 404;
      return next(error);
    }

    res.status(200).json(updatedUser);
  } catch (err) {
    next(err);
  }
};

// PUT /api/users/:id/add-coaching-center
exports.addCoachingCenter = async (req, res, next) => {
  try {
    const { coachingCenterId } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { $addToSet: { coachingCenters: coachingCenterId } },
      { new: true }
    ).populate('courses coachingCenters');

    if (!updatedUser) {
      const error = new Error('User not found');
      error.statusCode = 404;
      return next(error);
    }

    res.status(200).json(updatedUser);
  } catch (err) {
    next(err);
  }
};

// PUT /api/users/:id/update
exports.updateUser = async (req, res, next) => {
  try {
    const updated = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!updated) {
      const error = new Error('User not found');
      error.statusCode = 404;
      return next(error);
    }

    res.status(200).json(updated);
  } catch (err) {
    next(err);
  }
};