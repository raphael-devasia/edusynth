const mongoose = require('mongoose');

const ExamGroupSchema = new mongoose.Schema({
  name: { type: String, required: true },
  exam_type: { type: String, required: true },
  description: { type: String },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('ExamGroup', ExamGroupSchema);
