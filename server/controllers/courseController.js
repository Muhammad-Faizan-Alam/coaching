const Course = require('../models/Course');

// GET /api/courses
exports.getAllCourses = async (req, res) => {
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
    res.status(500).json({ message: 'Server Error', error: err.message });
  }
};

// GET /api/courses/:id
exports.getCourseById = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id).populate('coachingCenter').populate('subject');
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }
    res.status(200).json(course);
  } catch (err) {
    res.status(500).json({ message: 'Server Error', error: err.message });
  }
};

// POST /api/courses
exports.createCourse = async (req, res) => {
  try {
    const { title, description, duration, learners, subject, coachingCenter } = req.body;

    const newCourse = new Course({
      title,
      description,
      duration,
      learners,
      subject,
      coachingCenter,
    });

    const saved = await newCourse.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ message: 'Failed to add new course', error: err.message });
  }
};

// PUT /api/courses/:id
exports.updateCourse = async (req, res) => {
  try {
    const updated = await Course.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    }).populate('coachingCenter').populate('subject');

    if (!updated) {
      return res.status(404).json({ message: 'Course not found' });
    }

    res.status(200).json(updated);
  } catch (err) {
    res.status(400).json({ message: 'Failed to update', error: err.message });
  }
};

// DELETE /api/couses/:id
exports.deleteCourse = async (req, res) => {
  try {
    const deleted = await Course.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ message: 'Course not found' });
    }

    res.status(200).json({ message: 'Course deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Delete failed', error: err.message });
  }
};