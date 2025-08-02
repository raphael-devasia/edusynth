const mongoose = require('mongoose');

const ContentSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  file: { type: String },
  class_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Class' },
  section_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Section' },
  cls_sec_id: { type: mongoose.Schema.Types.ObjectId, ref: 'ClassSection' },
  created_by: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  roles: [{ type: String }],
  category: { type: String },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Content', ContentSchema);
