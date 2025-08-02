const mongoose = require('mongoose');

const StudentSiblingSchema = new mongoose.Schema({
  student_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
  sibling_student_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
  relation: { type: String },
  remarks: { type: String },
  is_active: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('StudentSibling', StudentSiblingSchema);
