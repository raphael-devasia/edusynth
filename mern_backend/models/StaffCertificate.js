const mongoose = require('mongoose');

const StaffCertificateSchema = new mongoose.Schema({
  staff_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Staff', required: true },
  certificate_name: { type: String, required: true },
  certificate_number: { type: String },
  issue_date: { type: Date },
  expiry_date: { type: Date },
  file: { type: String },
  remarks: { type: String },
  is_active: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('StaffCertificate', StaffCertificateSchema);
