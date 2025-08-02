const mongoose = require('mongoose');

const StaffAttendanceSchema = new mongoose.Schema({
  staff_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Staff', required: true },
  date: { type: Date, required: true },
  status: { type: String, enum: ['Present', 'Absent', 'Leave', 'Half Day', 'Late'], required: true },
  remark: { type: String },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('StaffAttendance', StaffAttendanceSchema);
