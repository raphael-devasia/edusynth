const mongoose = require('mongoose');

const QuestionSchema = new mongoose.Schema({
  question: { type: String, required: true },
  subject_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Subject', required: true },
  class_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Class' },
  section_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Section' },
  level: { type: String },
  question_type: { type: String, enum: ['multiple_choice', 'descriptive', 'true_false', 'fill_blank'], required: true },
  options: [{ text: String, is_correct: Boolean }],
  marks: { type: Number, default: 1.0 },
  neg_marks: { type: Number, default: 0.25 },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Question', QuestionSchema);
