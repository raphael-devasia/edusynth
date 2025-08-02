const mongoose = require('mongoose');

const DueFeeSchema = new mongoose.Schema({
  student_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
  session_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Session' },
  due_date: { type: Date, required: true },
  amount: { type: Number, required: true },
  remarks: { type: String },
  is_active: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('DueFee', DueFeeSchema);
