const mongoose = require('mongoose');

const ClassSectionTimeSchema = new mongoose.Schema({
  class_section_id: { type: mongoose.Schema.Types.ObjectId, ref: 'ClassSection', required: true },
  time: { type: String, required: true }, // e.g. '11:00:00'
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('ClassSectionTime', ClassSectionTimeSchema);
