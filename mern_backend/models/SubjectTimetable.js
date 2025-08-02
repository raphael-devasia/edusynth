const mongoose = require('mongoose');

const SubjectTimetableSchema = new mongoose.Schema({
  subject_group_subject_id: { type: mongoose.Schema.Types.ObjectId, required: true },
  staff_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Staff', required: true },
  day: { type: String, required: true },
  start_time: { type: String, required: true },
  end_time: { type: String, required: true },
  room: { type: String },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('SubjectTimetable', SubjectTimetableSchema);
