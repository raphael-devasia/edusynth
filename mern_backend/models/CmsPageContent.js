const mongoose = require('mongoose');

const CmsPageContentSchema = new mongoose.Schema({
  page_id: { type: mongoose.Schema.Types.ObjectId, ref: 'CmsPage', required: true },
  content_type: { type: String, required: true },
  content: { type: String, required: true },
  status: { type: Boolean, default: true },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('CmsPageContent', CmsPageContentSchema);
