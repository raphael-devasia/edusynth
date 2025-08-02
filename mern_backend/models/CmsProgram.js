const mongoose = require('mongoose');

const CmsProgramSchema = new mongoose.Schema({
  title: { type: String, required: true },
  type: { type: String, required: true }, // e.g. event, news, gallery
  description: { type: String },
  event_start: { type: Date },
  event_end: { type: Date },
  featured_image: { type: String },
  status: { type: Boolean, default: true },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('CmsProgram', CmsProgramSchema);
