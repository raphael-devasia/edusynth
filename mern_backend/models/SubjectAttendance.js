const mongoose = require('mongoose');

const SubjectAttendanceSchema = new mongoose.Schema({
  student_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
  subject_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Subject', required: true },
  class_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Class', required: true },
  section_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Section', required: true },
  date: { type: Date, required: true },
  status: { type: String, enum: ['present', 'absent', 'leave'], required: true },
  remarks: { type: String },
  session_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Session', required: true },
  is_active: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('SubjectAttendance', SubjectAttendanceSchema);
