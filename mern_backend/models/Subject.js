const mongoose = require('mongoose');

const SubjectSchema = new mongoose.Schema({
  name: { type: String, required: true },
  code: { type: String },
  type: { type: String },
  class_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Class' },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Subject', SubjectSchema);
