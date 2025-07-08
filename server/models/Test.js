const mongoose = require('mongoose');

const TestSchema = new mongoose.Schema({
    title: {type: String, required: true},
    thumbnail: {type: String, required: true},
    description: String,
    year: Number,
    hours: Number,
    questions: Number,
    subjects: [{type: mongoose.Schema.Types.ObjectId, ref: 'Subject'}]
});
module.exports = mongoose.model('Test', TestSchema);