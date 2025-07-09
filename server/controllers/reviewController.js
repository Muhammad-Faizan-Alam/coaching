const Review = require('../models/Review');
const CoachingCenter = require('../models/CoachingCenter');
const { validationResult } = require('express-validator');

// POST /api/reviews
exports.createReview = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error('Validation Failed');
    error.statusCode = 422;
    error.errors = errors.array();
    return next(error);
  }

  try {
    const { user, coachingCenter, rating, comment } = req.body;

    // Prevent duplicate review by same user
    const alreadyReviewed = await Review.findOne({ user, coachingCenter });
    if (alreadyReviewed) {
      const error = new Error('You have already reviewed this coaching center');
      error.statusCode = 400;
      return next(error);
    }

    const review = new Review({ user, coachingCenter, rating, comment });
    await review.save();

    // Update average rating on coaching center
    const reviews = await Review.find({ coachingCenter });
    const avgRating =
      reviews.reduce((acc, curr) => acc + curr.rating, 0) / reviews.length;

    await CoachingCenter.findByIdAndUpdate(coachingCenter, { rating: avgRating });

    res.status(201).json({ message: 'Review posted successfully', review });
  } catch (err) {
    next(err);
  }
};

// GET /api/reviews/center/:coachingCenterId
exports.getReviewsByCenter = async (req, res, next) => {
  try {
    const reviews = await Review.find({ coachingCenter: req.params.coachingCenterId })
      .populate('user', 'username profileImage')
      .sort({ createdAt: -1 });

    res.status(200).json(reviews);
  } catch (err) {
    next(err);
  }
};

// DELETE /api/reviews/:id
exports.deleteReview = async (req, res, next) => {
  try {
    const review = await Review.findByIdAndDelete(req.params.id);

    if (!review) {
      const error = new Error('Review not found');
      error.statusCode = 404;
      return next(error);
    }

    // Recalculate average rating
    const reviews = await Review.find({ coachingCenter: review.coachingCenter });
    const avgRating = reviews.length
      ? reviews.reduce((acc, curr) => acc + curr.rating, 0) / reviews.length
      : 0;

    await CoachingCenter.findByIdAndUpdate(review.coachingCenter, { rating: avgRating });

    res.status(200).json({ message: 'Review deleted successfully' });
  } catch (err) {
    next(err);
  }
};