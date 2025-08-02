const mongoose = require('mongoose');

const FeesTypeDiscountSchema = new mongoose.Schema({
  fees_type_id: { type: mongoose.Schema.Types.ObjectId, ref: 'FeeType', required: true },
  discount_id: { type: mongoose.Schema.Types.ObjectId, ref: 'FeeDiscount', required: true },
  amount: { type: Number, required: true },
  remarks: { type: String },
  is_active: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('FeesTypeDiscount', FeesTypeDiscountSchema);
