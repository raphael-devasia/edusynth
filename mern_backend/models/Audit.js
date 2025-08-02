const mongoose = require('mongoose');

const AuditSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Staff', required: true },
  message: { type: String, required: true },
  action: { type: String },
  ip_address: { type: String },
  platform: { type: String },
  agent: { type: String },
  created_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Audit', AuditSchema);
