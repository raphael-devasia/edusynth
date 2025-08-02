const mongoose = require('mongoose');

const SalarySchema = new mongoose.Schema({
  staff_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Staff', required: true },
  month: { type: String, required: true }, // e.g., 'January', 'February'
  year: { type: Number, required: true },
  basic: { type: Number, required: true },
  allowances: { type: Number, default: 0 },
  deductions: { type: Number, default: 0 },
  net_salary: { type: Number, required: true },
  paid: { type: Boolean, default: false },
  payment_date: { type: Date },
  payment_mode: { type: String },
  remarks: { type: String },
  is_active: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('Salary', SalarySchema);
