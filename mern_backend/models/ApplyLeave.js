const mongoose = require('mongoose');

const ApplyLeaveSchema = new mongoose.Schema({
  student_session_id: { type: mongoose.Schema.Types.ObjectId, ref: 'StudentSession', required: true },
  from_date: { type: Date, required: true },
  to_date: { type: Date, required: true },
  reason: { type: String, required: true },
  status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
  approve_by: { type: mongoose.Schema.Types.ObjectId, ref: 'Staff' },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('ApplyLeave', ApplyLeaveSchema);
