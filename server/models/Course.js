const mongoose = require('mongoose');

const CourseSchema = new mongoose.Schema({
    title: {type: String, required: true},
    description: {type: String},
    duration: Number,
    learners: Number,
    subject: [{type: mongoose.Schema.Types.ObjectId, ref: 'Subject'}],
    coachingCenter: {type: mongoose.Schema.Types.ObjectId, ref: 'CoachingCenter'}
});
module.exports = mongoose.model('Course', CourseSchema);