const mongoose = require('mongoose');

const CoachingCenterSchema = new mongoose.Schema({
    name: { type: String, required: true },
    thumbnail: { type: String, required: true },
    city: { type: String, required: true },
    rating: { type: Number, default: 0 },
    minFee: { type: Number, required: true },
    maxFee: { type: Number, required: true },
    courses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }]
});
module.exports = mongoose.model('CoachingCenter', CoachingCenterSchema);