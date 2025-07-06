const mongoose = require('mongoose');

const CoachingCenterSchema = new mongoose.Schema({
    name: {type: String, require: true},
    city: {type: String, require: true},
    rating: {type: Number, default: 0},
    reviews: [String],
    minFee: Number,
    maxFee: Number,
    courses: [{type: mongoose.Schema.Types.ObjectId, ref: 'Course'}]
});
module.exports = mongoose.model('CoachingCenter', CoachingCenterSchema);