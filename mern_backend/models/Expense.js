const mongoose = require('mongoose');

const ExpenseSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  invoice_no: { type: String },
  name: { type: String, required: true },
  amount: { type: Number, required: true },
  documents: { type: String },
  note: { type: String },
  exp_head_id: { type: mongoose.Schema.Types.ObjectId, ref: 'ExpenseHead', required: true },
  exp_category: { type: String },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Expense', ExpenseSchema);
