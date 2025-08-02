const mongoose = require('mongoose');

const FeeMasterSchema = new mongoose.Schema({
  feetype_id: { type: mongoose.Schema.Types.ObjectId, ref: 'FeeType', required: true },
  class_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Class', required: true },
  session_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Session', required: true },
  amount: { type: Number, required: true },
  description: { type: String },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('FeeMaster', FeeMasterSchema);
