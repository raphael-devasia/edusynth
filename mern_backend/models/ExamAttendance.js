const mongoose = require('mongoose');

const ExamAttendanceSchema = new mongoose.Schema({
  exam_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Exam', required: true },
  class_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Class', required: true },
  section_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Section', required: true },
  subject_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Subject', required: true },
  student_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
  attendance_date: { type: Date, required: true },
  status: { type: String, enum: ['present', 'absent'], required: true },
  remarks: { type: String },
  is_active: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('ExamAttendance', ExamAttendanceSchema);
