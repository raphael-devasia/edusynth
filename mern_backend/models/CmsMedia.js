const mongoose = require('mongoose');

const CmsMediaSchema = new mongoose.Schema({
  img_name: { type: String, required: true, unique: true },
  img_path: { type: String, required: true },
  description: { type: String },
  uploaded_by: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('CmsMedia', CmsMediaSchema);
