const Test = require('../models/Test');
const { validationResult } = require('express-validator');

// GET /api/tests
exports.getAllTests = async (req, res, next) => {
  try {
    const { page = 1 } = req.query;
    const limit = 5;
    const skip = (page - 1) * limit;

    const total = await Test.countDocuments();
    const tests = await Test.find()
      .populate('subjects')
      .skip(skip)
      .limit(limit);

    res.status(200).json({
      total,
      page: Number(page),
      totalPages: Math.ceil(total / limit),
      data: tests,
    });
  } catch (err) {
    next(err);
  }
};

// GET /api/tests/:id
exports.getTestById = async (req, res, next) => {
  try {
    const test = await Test.findById(req.params.id).populate('subjects');
    if (!test) {
      const error = new Error('Test not found');
      error.statusCode = 404;
      return next(error);
    }
    res.status(200).json(test);
  } catch (err) {
    next(err);
  }
};

// POST /api/tests
exports.createTest = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error('Validation Failed');
    error.statusCode = 422;
    error.errors = errors.array();
    return next(error);
  }

  try {
    const { title, description, year, hours, questions, subjects } = req.body;

    const newTest = new Test({
      title,
      description,
      year,
      hours,
      questions,
      subjects,
    });

    const saved = await newTest.save();
    res.status(201).json(saved);
  } catch (err) {
    next(err);
  }
};

// PUT /api/tests/:id
exports.updateTest = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error('Validation Failed');
    error.statusCode = 422;
    error.errors = errors.array();
    return next(error);
  }

  try {
    const updated = await Test.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    }).populate('subjects');

    if (!updated) {
      const error = new Error('Test not found');
      error.statusCode = 404;
      return next(error);
    }

    res.status(200).json(updated);
  } catch (err) {
    next(err);
  }
};

// DELETE /api/tests/:id
exports.deleteTest = async (req, res, next) => {
  try {
    const deleted = await Test.findByIdAndDelete(req.params.id);

    if (!deleted) {
      const error = new Error('Test not found');
      error.statusCode = 404;
      return next(error);
    }

    res.status(200).json({ message: 'Test deleted successfully' });
  } catch (err) {
    next(err);
  }
};