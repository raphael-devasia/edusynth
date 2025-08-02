const mongoose = require('mongoose');

const DisableReasonSchema = new mongoose.Schema({
  reason: { type: String, required: true },
  description: { type: String },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('DisableReason', DisableReasonSchema);
