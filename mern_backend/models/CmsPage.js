const mongoose = require('mongoose');

const CmsPageSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  description: { type: String },
  meta_title: { type: String },
  meta_description: { type: String },
  meta_keywords: { type: String },
  status: { type: Boolean, default: true },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('CmsPage', CmsPageSchema);
