const mongoose = require('mongoose');

const SubjectSchema = new mongoose.Schema({
    title: {type: String, require: true},
    tests: [{type: mongoose.Schema.Types.ObjectId, ref: 'Test'}],
    courses: [{type: mongoose.Schema.Types.ObjectId, ref: 'Course'}]
});
module.exports = mongoose.model('Subject', SubjectSchema);