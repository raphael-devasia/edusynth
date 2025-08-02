const mongoose = require('mongoose');

const StudentCertificateSchema = new mongoose.Schema({
  student_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
  certificate_type: { type: String, required: true },
  issue_date: { type: Date },
  remarks: { type: String },
  is_active: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('StudentCertificate', StudentCertificateSchema);
