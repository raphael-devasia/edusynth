const mongoose = require('mongoose');

const CurrencySchema = new mongoose.Schema({
  name: { type: String, required: true },
  code: { type: String, required: true },
  symbol: { type: String, required: true },
  country: { type: String },
  is_default: { type: Boolean, default: false },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Currency', CurrencySchema);
