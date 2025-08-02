const mongoose = require('mongoose');

const StaffLeaveDetailSchema = new mongoose.Schema({
  staff_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Staff',
    required: true
  },
  leave_type_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'LeaveType',
    required: true
  },
  alloted_leave: {
    type: String,
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model('StaffLeaveDetail', StaffLeaveDetailSchema);
