const mongoose = require('mongoose');

const StaffRatingSchema = new mongoose.Schema({
  staff_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Staff', required: true },
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // student or user who rated
  rate: { type: Number, min: 1, max: 5, required: true },
  comment: { type: String },
  status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'approved' },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});

StaffRatingSchema.pre('save', function(next) {
  this.updated_at = Date.now();
  next();
});

module.exports = mongoose.model('StaffRating', StaffRatingSchema);
