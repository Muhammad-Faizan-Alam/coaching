const Subject = require('../models/Subject');
const { validationResult } = require('express-validator');

// GET /api/subjects
exports.getAllSubjects = async (req, res, next) => {
  try {
    const { page = 1 } = req.query;
    const limit = 5;
    const skip = (page - 1) * limit;

    const total = await Subject.countDocuments();
    const subjects = await Subject.find()
      .populate('tests')
      .populate('courses')
      .skip(skip)
      .limit(limit);

    res.status(200).json({
      total,
      page: Number(page),
      totalPages: Math.ceil(total / limit),
      data: subjects,
    });
  } catch (err) {
    next(err);
  }
};

// GET /api/subjects/:id
exports.getSubjectById = async (req, res, next) => {
  try {
    const subject = await Subject.findById(req.params.id)
      .populate('tests')
      .populate('courses');

    if (!subject) {
      const error = new Error('Subject not found');
      error.statusCode = 404;
      return next(error);
    }

    res.status(200).json(subject);
  } catch (err) {
    next(err);
  }
};

// POST /api/subjects
exports.createSubject = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error('Validation Failed');
    error.statusCode = 422;
    error.errors = errors.array();
    return next(error);
  }

  try {
    const { title, tests, courses } = req.body;

    const newSubject = new Subject({
      title,
      tests,
      courses,
    });

    const saved = await newSubject.save();
    res.status(201).json(saved);
  } catch (err) {
    next(err);
  }
};

// PUT /api/subjects/:id
exports.updateSubject = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error('Validation Failed');
    error.statusCode = 422;
    error.errors = errors.array();
    return next(error);
  }

  try {
    const updated = await Subject.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    }).populate('tests').populate('courses');

    if (!updated) {
      const error = new Error('Subject not found');
      error.statusCode = 404;
      return next(error);
    }

    res.status(200).json(updated);
  } catch (err) {
    next(err);
  }
};

// DELETE /api/subjects/:id
exports.deleteSubject = async (req, res, next) => {
  try {
    const deleted = await Subject.findByIdAndDelete(req.params.id);

    if (!deleted) {
      const error = new Error('Subject not found');
      error.statusCode = 404;
      return next(error);
    }

    res.status(200).json({ message: 'Subject deleted successfully' });
  } catch (err) {
    next(err);
  }
};