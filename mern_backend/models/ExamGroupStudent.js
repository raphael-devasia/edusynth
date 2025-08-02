const mongoose = require('mongoose');

const ExamGroupStudentSchema = new mongoose.Schema({
  exam_group_id: { type: mongoose.Schema.Types.ObjectId, ref: 'ExamGroup', required: true },
  student_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
  class_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Class' },
  section_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Section' },
  batch_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Batch' },
  exam_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Exam' },
  student_session_id: { type: mongoose.Schema.Types.ObjectId, ref: 'StudentSession' },
  exam_roll_no: { type: String },
  rank: { type: Number },
  teacher_remark: { type: String },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('ExamGroupStudent', ExamGroupStudentSchema);
