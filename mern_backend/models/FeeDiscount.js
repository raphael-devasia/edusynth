const mongoose = require('mongoose');

const FeeDiscountSchema = new mongoose.Schema({
  name: { type: String, required: true },
  code: { type: String, required: true, unique: true },
  amount: { type: Number, required: true },
  description: { type: String },
  type: { type: String, enum: ['percentage', 'fixed'], required: true },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('FeeDiscount', FeeDiscountSchema);
