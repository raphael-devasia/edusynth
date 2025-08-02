const mongoose = require('mongoose');

const FeesPaymentSchema = new mongoose.Schema({
  student_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
  fees_type_id: { type: mongoose.Schema.Types.ObjectId, ref: 'FeeType', required: true },
  amount: { type: Number, required: true },
  payment_date: { type: Date, required: true },
  payment_mode: { type: String },
  transaction_id: { type: String },
  remarks: { type: String },
  is_active: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('FeesPayment', FeesPaymentSchema);
