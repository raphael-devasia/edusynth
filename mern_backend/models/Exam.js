const mongoose = require('mongoose');

const ExamSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  session_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Session', required: true },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Exam', ExamSchema);
