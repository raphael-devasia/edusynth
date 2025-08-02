const mongoose = require('mongoose');

const ExamScheduleSchema = new mongoose.Schema({
  exam_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Exam', required: true },
  teacher_subject_id: { type: mongoose.Schema.Types.ObjectId, ref: 'TeacherSubject', required: true },
  full_marks: { type: Number },
  passing_marks: { type: Number },
  exam_date: { type: Date },
  start_time: { type: String },
  end_time: { type: String },
  session_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Session' },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('ExamSchedule', ExamScheduleSchema);
