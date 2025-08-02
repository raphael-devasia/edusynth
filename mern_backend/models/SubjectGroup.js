const mongoose = require('mongoose');

const SubjectGroupSchema = new mongoose.Schema({
  name: { type: String, required: true },
  class_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Class', required: true },
  section_ids: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Section' }],
  session_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Session', required: true },
  description: { type: String },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('SubjectGroup', SubjectGroupSchema);
