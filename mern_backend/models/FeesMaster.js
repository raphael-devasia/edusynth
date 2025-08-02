const mongoose = require('mongoose');

const FeesMasterSchema = new mongoose.Schema({
  fees_group_id: { type: mongoose.Schema.Types.ObjectId, ref: 'FeesGroup', required: true },
  fees_type_id: { type: mongoose.Schema.Types.ObjectId, ref: 'FeeType', required: true },
  amount: { type: Number, required: true },
  due_date: { type: Date },
  session_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Session' },
  is_active: { type: Boolean, default: true },
  remarks: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('FeesMaster', FeesMasterSchema);
