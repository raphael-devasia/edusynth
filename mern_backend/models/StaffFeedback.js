const mongoose = require('mongoose');

const StaffFeedbackSchema = new mongoose.Schema({
  staff_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Staff', required: true },
  student_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
  rating: { type: Number, min: 1, max: 5, required: true },
  comment: { type: String },
  created_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('StaffFeedback', StaffFeedbackSchema);
