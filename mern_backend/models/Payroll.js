const mongoose = require('mongoose');

const PayrollSchema = new mongoose.Schema({
  staff_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Staff', required: true },
  payslip_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Payslip' },
  month: { type: Number, required: true },
  year: { type: Number, required: true },
  status: { type: String },
  allowances: [{ type: mongoose.Schema.Types.ObjectId, ref: 'PayslipAllowance' }],
  deductions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'PayslipDeduction' }],
  net_salary: { type: Number },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Payroll', PayrollSchema);
