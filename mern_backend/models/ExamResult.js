const mongoose = require('mongoose');

const ExamResultSchema = new mongoose.Schema({
  exam_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Exam', required: true },
  student_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
  marks_obtained: { type: Number, required: true },
  total_marks: { type: Number },
  grade: { type: String },
  remarks: { type: String },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('ExamResult', ExamResultSchema);
