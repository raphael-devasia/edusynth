const mongoose = require('mongoose');

const RemarkSchema = new mongoose.Schema({
  student_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
  remark: { type: String, required: true },
  date: { type: Date, default: Date.now },
  given_by: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  is_active: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('Remark', RemarkSchema);
