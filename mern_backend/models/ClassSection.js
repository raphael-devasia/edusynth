const mongoose = require('mongoose');

const ClassSectionSchema = new mongoose.Schema({
  class_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Class', required: true },
  section_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Section', required: true },
  // Optionally include section name for denormalization
  section_name: { type: String },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('ClassSection', ClassSectionSchema);
