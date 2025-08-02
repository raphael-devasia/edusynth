const mongoose = require('mongoose');

const OfflinePaymentSchema = new mongoose.Schema({
  student_session_id: { type: mongoose.Schema.Types.ObjectId, ref: 'StudentSession', required: true },
  student_fees_master_id: { type: mongoose.Schema.Types.ObjectId, ref: 'StudentFeeMaster' },
  fee_groups_feetype_id: { type: mongoose.Schema.Types.ObjectId, ref: 'FeeGroupsFeetype' },
  student_transport_fee_id: { type: mongoose.Schema.Types.ObjectId, ref: 'StudentTransportFee' },
  amount: { type: Number, required: true },
  payment_date: { type: Date },
  payment_mode: { type: String },
  note: { type: String },
  documents: { type: String },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('OfflinePayment', OfflinePaymentSchema);
