const mongoose = require('mongoose');

const StudentFeeMasterSchema = new mongoose.Schema({
  student_session_id: { type: mongoose.Schema.Types.ObjectId, ref: 'StudentSession', required: true },
  fee_session_group_id: { type: mongoose.Schema.Types.ObjectId, ref: 'FeeSessionGroup', required: true },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('StudentFeeMaster', StudentFeeMasterSchema);
