const mongoose = require('mongoose');

const BatchSubjectSchema = new mongoose.Schema({
  exam_group_class_batch_exams_id: { type: mongoose.Schema.Types.ObjectId, required: true },
  subject_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Subject', required: true },
  date_from: { type: Date },
  time_from: { type: String },
  date_to: { type: Date },
  time_to: { type: String },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('BatchSubject', BatchSubjectSchema);
