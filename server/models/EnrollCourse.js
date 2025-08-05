// model to enroll a user in a course by using studentId and courseId and coachingCenterId
const mongoose = require('mongoose');
const EnrollCourseSchema = new mongoose.Schema({
    studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    courseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
    coachingCenterId: { type: mongoose.Schema.Types.ObjectId, ref: 'CoachingCenter', required: true },
    enrollmentDate: { type: Date, default: Date.now },
    status: {
        type: String,
        enum: ['enrolled', 'completed', 'dropped'],
        default: 'enrolled'
    }
});
module.exports = mongoose.model('EnrollCourse', EnrollCourseSchema);