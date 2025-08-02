const mongoose = require('mongoose');

const AlumniSchema = new mongoose.Schema({
  student_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
  graduation_year: { type: Number },
  current_status: { type: String },
  remarks: { type: String },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Alumni', AlumniSchema);
