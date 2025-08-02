const mongoose = require('mongoose');

const FeesStatementSchema = new mongoose.Schema({
  student_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
  session_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Session' },
  statement_date: { type: Date, required: true },
  total_due: { type: Number, required: true },
  total_paid: { type: Number, required: true },
  total_fine: { type: Number, default: 0 },
  remarks: { type: String },
  is_active: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('FeesStatement', FeesStatementSchema);
