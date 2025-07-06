const Test = require('../models/Test');

// GET /api/tests
exports.getAllTests = async (req, res) => {
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
    res.status(500).json({ message: 'Server Error', error: err.message });
  }
};

// GET /api/tests/:id
exports.getTestById = async (req, res) => {
  try {
    const test = await Test.findById(req.params.id).populate('subjects');
    if (!test) {
      return res.status(404).json({ message: 'Test not found' });
    }
    res.status(200).json(test);
  } catch (err) {
    res.status(500).json({ message: 'Server Error', error: err.message });
  }
};

// POST /api/tests
exports.createTest = async (req, res) => {
  try {
    const { title, description, year, hours, questions, subjects } = req.body;

    const newTest = new Test({
      title,
      description,
      year,
      hours,
      questions,
      subjects
    });

    const saved = await newTest.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ message: 'Failed to add new test', error: err.message });
  }
};

// PUT /api/tests/:id
exports.updateTest = async (req, res) => {
  try {
    const updated = await Subject.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    }).populate('subjects');

    if (!updated) {
      return res.status(404).json({ message: 'Test not found' });
    }

    res.status(200).json(updated);
  } catch (err) {
    res.status(400).json({ message: 'Failed to update', error: err.message });
  }
};

// DELETE /api/tests/:id
exports.deleteTest = async (req, res) => {
  try {
    const deleted = await Test.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ message: 'Test not found' });
    }

    res.status(200).json({ message: 'Test deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Delete failed', error: err.message });
  }
};