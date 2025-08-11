const Course = require('../models/Course');
const CoachingCenter = require('../models/CoachingCenter');
const { validationResult } = require('express-validator');

// GET /api/courses
exports.getAllCourses = async (req, res, next) => {
  try {
    const { duration, page = 1 } = req.query;
    const limit = 5;
    const skip = (page - 1) * limit;

    let filters = {};
    if (duration) filters.duration = { $lte: Number(duration) };

    const total = await Course.countDocuments(filters);
    const courses = await Course.find(filters)
      .populate('coachingCenter')
      .populate('subject')
      .skip(skip)
      .limit(limit);

    res.status(200).json({
      total,
      page: Number(page),
      totalPages: Math.ceil(total / limit),
      data: courses,
    });
  } catch (err) {
    next(err);
  }
};

// GET /api/courses/:id
exports.getCourseById = async (req, res, next) => {
  try {
    const course = await Course.findById(req.params.id)
      .populate('coachingCenter')
      .populate('subject');

    if (!course) {
      const error = new Error('Course not found');
      error.statusCode = 404;
      return next(error);
    }

    res.status(200).json(course);
  } catch (err) {
    next(err);
  }
};

// POST /api/courses
exports.createCourse = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error('Validation Failed');
    error.statusCode = 422;
    error.errors = errors.array();
    return next(error);
  }

  try {
    const { title, thumbnail, description, duration, learners, subject, coachingCenter } = req.body;

    const newCourse = new Course({
      title,
      thumbnail,
      description,
      duration,
      learners,
      subject,
      coachingCenter, // now expects an array
    });

    const saved = await newCourse.save();

    // Add course ID to each coaching center's courses array
    if (Array.isArray(coachingCenter)) {
      for (const centerId of coachingCenter) {
        await CoachingCenter.findByIdAndUpdate(
          centerId,
          { $push: { courses: saved._id } }
        );
      }
    } else if (coachingCenter) {
      await CoachingCenter.findByIdAndUpdate(
        coachingCenter,
        { $push: { courses: saved._id } }
      );
    }

    // Add course ID to the subject's courses array
    const Subject = require('../models/Subject');
    await Subject.findByIdAndUpdate(
      subject,
      { $push: { courses: saved._id } }
    );

    res.status(201).json(saved);
  } catch (err) {
    next(err);
  }
};

// PUT /api/courses/:id
exports.updateCourse = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error('Validation Failed');
    error.statusCode = 422;
    error.errors = errors.array();
    return next(error);
  }

  try {
    const updated = await Course.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    }).populate('coachingCenter').populate('subject');

    if (!updated) {
      const error = new Error('Course not found');
      error.statusCode = 404;
      return next(error);
    }

    res.status(200).json(updated);
  } catch (err) {
    next(err);
  }
};

// DELETE /api/courses/:id
exports.deleteCourse = async (req, res, next) => {
  try {
    const deleted = await Course.findByIdAndDelete(req.params.id);

    if (!deleted) {
      const error = new Error('Course not found');
      error.statusCode = 404;
      return next(error);
    }

    res.status(200).json({ message: 'Course deleted successfully' });
  } catch (err) {
    next(err);
  }
};