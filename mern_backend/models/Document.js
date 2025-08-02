const mongoose = require('mongoose');

const DocumentSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  file_url: { type: String, required: true },
  uploaded_by: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  upload_date: { type: Date, default: Date.now },
  is_active: { type: Boolean, default: true },
  remarks: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Document', DocumentSchema);
