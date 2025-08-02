const mongoose = require('mongoose');

const SubjectTeacherSchema = new mongoose.Schema({
  subject_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Subject', required: true },
  class_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Class', required: true },
  section_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Section', required: true },
  teacher_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Staff', required: true },
  session_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Session', required: true },
  is_active: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('SubjectTeacher', SubjectTeacherSchema);
