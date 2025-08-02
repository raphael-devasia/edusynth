const mongoose = require('mongoose');

const SmsConfigSchema = new mongoose.Schema({
  provider: { type: String, required: true },
  api_key: { type: String, required: true },
  sender_id: { type: String },
  username: { type: String },
  password: { type: String },
  url: { type: String },
  is_active: { type: Boolean, default: true },
  extra: { type: mongoose.Schema.Types.Mixed } // for any provider-specific fields
}, { timestamps: true });

module.exports = mongoose.model('SmsConfig', SmsConfigSchema);
