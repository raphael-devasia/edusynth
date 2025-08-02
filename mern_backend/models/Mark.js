const mongoose = require('mongoose');

const MarkSchema = new mongoose.Schema({
  student_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
  exam_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Exam', required: true },
  subject_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Subject', required: true },
  marks: { type: Number, required: true },
  remarks: { type: String },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Mark', MarkSchema);
