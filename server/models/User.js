const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true },
  profileImage: { type: String, required: true },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/.+\@.+\..+/, 'Please fill a valid email address']
  },
  role: {
    type: String,
    enum: ['user', 'institute', 'admin'],
    default: 'user'
  },
  courses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }],
  coachingCenters: [{ type: mongoose.Schema.Types.ObjectId, ref: 'CoachingCenter' }],
});

module.exports = mongoose.model('User', UserSchema);