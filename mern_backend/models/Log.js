const mongoose = require('mongoose');

const LogSchema = new mongoose.Schema({
  action: { type: String, required: true },
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  description: { type: String },
  timestamp: { type: Date, default: Date.now },
  ip_address: { type: String },
  is_active: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('Log', LogSchema);
