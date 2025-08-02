const mongoose = require('mongoose');

const HomeworkSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  class_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Class', required: true },
  section_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Section', required: true },
  subject_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Subject' },
  homework_date: { type: Date, required: true },
  submit_date: { type: Date, required: true },
  created_by: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Homework', HomeworkSchema);
