const mongoose = require('mongoose');

const FeeGroupTypeSchema = new mongoose.Schema({
  fee_groups_id: { type: mongoose.Schema.Types.ObjectId, ref: 'FeeGroup', required: true },
  fee_type_id: { type: mongoose.Schema.Types.ObjectId, ref: 'FeeType', required: true },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('FeeGroupType', FeeGroupTypeSchema);
