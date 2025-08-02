const mongoose = require('mongoose');

const FeeSessionGroupSchema = new mongoose.Schema({
  fee_groups_id: { type: mongoose.Schema.Types.ObjectId, ref: 'FeeGroup', required: true },
  session_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Session', required: true },
  nature: { type: String },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('FeeSessionGroup', FeeSessionGroupSchema);
