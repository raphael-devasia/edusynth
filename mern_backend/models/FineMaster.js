const mongoose = require('mongoose');

const FineMasterSchema = new mongoose.Schema({
  fine_type: { type: String, required: true },
  amount: { type: Number, required: true },
  description: { type: String },
  is_active: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('FineMaster', FineMasterSchema);
