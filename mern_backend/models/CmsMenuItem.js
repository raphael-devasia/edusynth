const mongoose = require('mongoose');

const CmsMenuItemSchema = new mongoose.Schema({
  menu_id: { type: mongoose.Schema.Types.ObjectId, ref: 'CmsMenu', required: true },
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  url: { type: String },
  parent_id: { type: mongoose.Schema.Types.ObjectId, ref: 'CmsMenuItem', default: null },
  order: { type: Number, default: 0 },
  status: { type: Boolean, default: true },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('CmsMenuItem', CmsMenuItemSchema);
