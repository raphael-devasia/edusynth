const mongoose = require('mongoose');

const IncomeSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  invoice_no: { type: String },
  name: { type: String, required: true },
  amount: { type: Number, required: true },
  documents: { type: String },
  note: { type: String },
  income_head_id: { type: mongoose.Schema.Types.ObjectId, ref: 'IncomeHead', required: true },
  income_category: { type: String },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Income', IncomeSchema);
