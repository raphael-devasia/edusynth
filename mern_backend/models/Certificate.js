const mongoose = require('mongoose');

const CertificateSchema = new mongoose.Schema({
  certificate_name: { type: String, required: true },
  certificate_text: { type: String, required: true },
  left_header: { type: String, required: true },
  center_header: { type: String, required: true },
  right_header: { type: String, required: true },
  left_footer: { type: String, required: true },
  right_footer: { type: String, required: true },
  center_footer: { type: String, required: true },
  background_image: { type: String, default: null },
  created_for: { type: Number, enum: [1, 2], required: true, comment: '1=staff, 2=students' },
  status: { type: Number, required: true },
  header_height: { type: Number, required: true },
  content_height: { type: Number, required: true },
  footer_height: { type: Number, required: true },
  content_width: { type: Number, required: true },
  enable_student_image: { type: Number, enum: [0, 1], required: true },
  enable_image_height: { type: Number, required: true },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Certificate', CertificateSchema);
