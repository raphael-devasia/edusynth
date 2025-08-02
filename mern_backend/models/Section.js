const mongoose = require('mongoose');

const SectionSchema = new mongoose.Schema({
  name: { type: String, required: true },
  class_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Class', required: true },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Section', SectionSchema);
