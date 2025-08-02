const mongoose = require('mongoose');

const StaffAttendanceScheduleSchema = new mongoose.Schema({
  role_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Role', required: true },
  staff_attendance_type_id: { type: mongoose.Schema.Types.ObjectId, ref: 'StaffAttendanceType' },
  entry_time_from: { type: String },
  entry_time_to: { type: String },
  total_institute_hour: { type: Number },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('StaffAttendanceSchedule', StaffAttendanceScheduleSchema);
