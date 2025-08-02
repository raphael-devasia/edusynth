const mongoose = require('mongoose');

const HomeworkEvaluationSchema = new mongoose.Schema({
  homework_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Homework', required: true },
  student_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
  student_session_id: { type: mongoose.Schema.Types.ObjectId, ref: 'StudentSession' },
  marks: { type: Number },
  note: { type: String, required: true },
  date: { type: Date, required: true },
  status: { type: String, required: true },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('HomeworkEvaluation', HomeworkEvaluationSchema);
