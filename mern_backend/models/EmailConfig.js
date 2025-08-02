const mongoose = require('mongoose');

const EmailConfigSchema = new mongoose.Schema({
  email_type: { type: String, required: true, unique: true },
  smtp_username: { type: String, required: true },
  smtp_password: { type: String, required: true },
  smtp_host: { type: String },
  smtp_port: { type: Number },
  smtp_secure: { type: Boolean, default: false },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('EmailConfig', EmailConfigSchema);
