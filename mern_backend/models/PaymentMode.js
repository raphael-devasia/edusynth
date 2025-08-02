const mongoose = require('mongoose');

const PaymentModeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  is_active: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('PaymentMode', PaymentModeSchema);
