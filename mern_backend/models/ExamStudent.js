const mongoose = require('mongoose');

const ExamStudentSchema = new mongoose.Schema({
  student_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
  class_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Class', required: true },
  section_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Section', required: true },
  exam_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Exam', required: true },
  student_session_id: { type: mongoose.Schema.Types.ObjectId, ref: 'StudentSession' },
  onlineexam_student_id: { type: mongoose.Schema.Types.ObjectId },
  onlineexam_student_session_id: { type: mongoose.Schema.Types.ObjectId },
  admission_no: { type: String },
  roll_no: { type: String },
  rank: { type: Number },
  marks: { type: Number },
  remarks: { type: String },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('ExamStudent', ExamStudentSchema);
