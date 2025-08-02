const mongoose = require('mongoose');

const StaffLeaveAllotmentSchema = new mongoose.Schema({
  staff: { type: mongoose.Schema.Types.ObjectId, ref: 'Staff', required: true },
  leaveType: { type: mongoose.Schema.Types.ObjectId, ref: 'LeaveType', required: true },
  allotted: { type: Number, required: true }, // Number of days allotted for this leave type
  session: { type: mongoose.Schema.Types.ObjectId, ref: 'Session', required: false }, // Optional: for session-based allotment
  notes: { type: String },
}, { timestamps: true });

StaffLeaveAllotmentSchema.index({ staff: 1, leaveType: 1, session: 1 }, { unique: true });

module.exports = mongoose.model('StaffLeaveAllotment', StaffLeaveAllotmentSchema);
