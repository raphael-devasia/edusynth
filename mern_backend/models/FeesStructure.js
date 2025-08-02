const mongoose = require('mongoose');

const FeesStructureSchema = new mongoose.Schema({
  fees_group_id: { type: mongoose.Schema.Types.ObjectId, ref: 'FeesGroup', required: true },
  fees_type_id: { type: mongoose.Schema.Types.ObjectId, ref: 'FeeType', required: true },
  amount: { type: Number, required: true },
  session_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Session' },
  remarks: { type: String },
  is_active: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('FeesStructure', FeesStructureSchema);
