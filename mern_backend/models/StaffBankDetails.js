const mongoose = require('mongoose');

const StaffBankDetailsSchema = new mongoose.Schema({
  staff_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Staff', required: true },
  bank_name: { type: String, required: true },
  branch: { type: String },
  account_number: { type: String, required: true },
  ifsc_code: { type: String },
  account_holder_name: { type: String },
  is_active: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('StaffBankDetails', StaffBankDetailsSchema);
