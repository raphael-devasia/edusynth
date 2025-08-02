const mongoose = require('mongoose');

const FeesGroupStudentSchema = new mongoose.Schema({
  fees_group_id: { type: mongoose.Schema.Types.ObjectId, ref: 'FeesGroup', required: true },
  student_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
  session_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Session' },
  is_active: { type: Boolean, default: true },
  remarks: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('FeesGroupStudent', FeesGroupStudentSchema);
