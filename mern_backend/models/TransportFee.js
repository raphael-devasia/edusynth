const mongoose = require('mongoose');

const TransportFeeSchema = new mongoose.Schema({
  session_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Session', required: true },
  month: { type: String, required: true },
  amount: { type: Number, required: true },
  description: { type: String },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('TransportFee', TransportFeeSchema);
