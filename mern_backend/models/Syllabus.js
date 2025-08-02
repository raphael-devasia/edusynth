const mongoose = require('mongoose');

const SyllabusSchema = new mongoose.Schema({
  subject_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Subject', required: true },
  class_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Class', required: true },
  section_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Section', required: true },
  session_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Session', required: true },
  lesson_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Lesson' },
  topic_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Topic' },
  created_for: { type: mongoose.Schema.Types.ObjectId, ref: 'Staff' },
  status: { type: String, enum: ['incomplete', 'complete'], default: 'incomplete' },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Syllabus', SyllabusSchema);
