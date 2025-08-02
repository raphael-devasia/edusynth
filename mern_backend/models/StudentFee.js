const mongoose = require('mongoose');

const StudentFeeSchema = new mongoose.Schema({
  student_session_id: { type: mongoose.Schema.Types.ObjectId, ref: 'StudentSession', required: true },
  feemaster_id: { type: mongoose.Schema.Types.ObjectId, ref: 'FeeMaster', required: true },
  amount: { type: Number, required: true },
  amount_discount: { type: Number, default: 0 },
  amount_fine: { type: Number, default: 0 },
  payment_mode: { type: String },
  date: { type: Date, required: true },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('StudentFee', StudentFeeSchema);
