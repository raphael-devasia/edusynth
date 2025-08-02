const mongoose = require('mongoose');

const PhotoSchema = new mongoose.Schema({
  title: { type: String, required: true },
  url: { type: String, required: true },
  description: { type: String },
  uploaded_by: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  uploaded_at: { type: Date, default: Date.now },
  tags: [{ type: String }],
  is_active: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('Photo', PhotoSchema);
