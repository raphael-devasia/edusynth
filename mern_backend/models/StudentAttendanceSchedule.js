const mongoose = require('mongoose');

const StudentAttendanceScheduleSchema = new mongoose.Schema({
  class_section_id: { type: mongoose.Schema.Types.ObjectId, ref: 'ClassSection', required: true },
  attendence_type_id: { type: mongoose.Schema.Types.ObjectId, ref: 'AttendanceType' },
  entry_time_from: { type: String },
  entry_time_to: { type: String },
  total_institute_hour: { type: Number },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('StudentAttendanceSchedule', StudentAttendanceScheduleSchema);
