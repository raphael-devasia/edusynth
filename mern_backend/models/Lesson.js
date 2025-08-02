const mongoose = require('mongoose');

const LessonSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  subject_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Subject', required: true },
  class_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Class' },
  section_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Section' },
  is_active: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('Lesson', LessonSchema);
