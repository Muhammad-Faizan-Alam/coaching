// controller for enrolling in a course
const EnrollCourse = require('../models/EnrollCourse');
const User = require('../models/User');
const Course = require('../models/Course');
const CoachingCenter = require('../models/CoachingCenter');
const { validationResult } = require('express-validator');

// POST /api/enroll
exports.enrollCourse = async (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        const error = new Error('Validation Failed');
        error.statusCode = 422;
        error.errors = errors.array();
        return next(error);
      }
    
      try {
        const { studentId, courseId, coachingCenterId } = req.body;
    
        const newEnroll = new EnrollCourse({
          studentId, courseId, coachingCenterId
        });
    
        const saved = await newEnroll.save();
        res.status(201).json(saved);
      } catch (err) {
        next(err);
      }
}