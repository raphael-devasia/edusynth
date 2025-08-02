const mongoose = require('mongoose');

const ExpenseHeadSchema = new mongoose.Schema({
  exp_category: { type: String, required: true },
  description: { type: String },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('ExpenseHead', ExpenseHeadSchema);
