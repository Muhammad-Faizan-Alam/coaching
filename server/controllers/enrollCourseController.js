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
        const { studentId, name, email, phone, address, courseId, coachingCenterId } = req.body;

        const newEnroll = new EnrollCourse({
            studentId,
            courseId,
            coachingCenterId,
            name,
            email,
            phone,
            address
        });

        const saved = await newEnroll.save();
        res.status(201).json(saved);
    } catch (err) {
        next(err);
    }
}

// GET /api/enroll
exports.getAllEnrollCourses = async (req, res, next) => {
    try {
        const enrollCourses = await EnrollCourse.find()
            .populate('studentId')
            .populate('courseId')
            .populate('coachingCenterId');

        res.status(200).json(enrollCourses);
    } catch (err) {
        next(err);
    }
}

// GET /api/enroll/studentId/:id
exports.getEnrollCourseByStudentId = async (req, res, next) => {
    try {
        const enrollCourses = await EnrollCourse.find({ studentId: req.params.id })
            .populate('studentId')
            .populate('courseId')
            .populate('coachingCenterId');

        if (enrollCourses.length === 0) {
            const error = new Error('No enrollments found for this student');
            error.statusCode = 404;
            return next(error);
        }

        res.status(200).json(enrollCourses);
    } catch (err) {
        next(err);
    }
}

// GET /api/enroll/course/:id
exports.getEnrollCourseByCourse = async (req, res, next) => {
    try {
        const enrollCourses = await EnrollCourse.find({ courseId: req.params.id })
            .populate('studentId')
            .populate('courseId')
            .populate('coachingCenterId');

        if (enrollCourses.length === 0) {
            const error = new Error('No enrollments found for this course');
            error.statusCode = 404;
            return next(error);
        }

        res.status(200).json(enrollCourses);
    } catch (err) {
        next(err);
    }
}

// GET /api/enroll/center/:id
exports.getEnrollCourseByCenter = async (req, res, next) => {
    try {
        const enrollCourses = await EnrollCourse.find({ coachingCenterId: req.params.id })
            .populate('studentId')
            .populate('courseId')
            .populate('coachingCenterId');

        if (enrollCourses.length === 0) {
            const error = new Error('No enrollments found for this coaching center');
            error.statusCode = 404;
            return next(error);
        }

        res.status(200).json(enrollCourses);
    } catch (err) {
        next(err);
    }
}

// PUT /api/enroll/:id
exports.updateEnrollCourse = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const error = new Error('Validation Failed');
        error.statusCode = 422;
        error.errors = errors.array();
        return next(error);
    }

    try {
        const enrollCourse = await EnrollCourse.findByIdAndUpdate(req.params.id, req.body, { new: true })
            .populate('studentId')
            .populate('courseId')
            .populate('coachingCenterId');

        if (!enrollCourse) {
            const error = new Error('Enrollment not found');
            error.statusCode = 404;
            return next(error);
        }

        res.status(200).json(enrollCourse);
    } catch (err) {
        next(err);
    }
}

// DELETE /api/enroll/:id
exports.deleteEnrollCourse = async (req, res, next) => {
    try {
        const enrollCourse = await EnrollCourse.findByIdAndDelete(req.params.id);

        if (!enrollCourse) {
            const error = new Error('Enrollment not found');
            error.statusCode = 404;
            return next(error);
        }

        res.status(200).json({ message: 'Enrollment deleted successfully' });
    } catch (err) {
        next(err);
    }
}