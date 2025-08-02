const mongoose = require('mongoose');

const StaffUploadSchema = new mongoose.Schema({
  staff_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Staff', required: true },
  file: { type: String, required: true },
  description: { type: String },
  uploaded_at: { type: Date, default: Date.now },
  is_active: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('StaffUpload', StaffUploadSchema);
