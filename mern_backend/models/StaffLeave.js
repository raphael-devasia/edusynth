const mongoose = require('mongoose');

const StaffLeaveSchema = new mongoose.Schema({
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
  leave_from: {
    type: Date,
    required: true
  },
  leave_to: {
    type: Date,
    required: true
  },
  leave_days: {
    type: Number,
    required: true
  },
  employee_remark: {
    type: String,
    default: ''
  },
  admin_remark: {
    type: String,
    default: ''
  },
  approve_date: {
    type: Date
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'disapproved'],
    default: 'pending'
  },
  applied_by: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  document_file: {
    type: String,
    default: ''
  },
  date: {
    type: Date,
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model('StaffLeave', StaffLeaveSchema);
