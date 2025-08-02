const mongoose = require('mongoose');

const IncomeHeadSchema = new mongoose.Schema({
  income_category: { type: String, required: true },
  description: { type: String },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('IncomeHead', IncomeHeadSchema);
