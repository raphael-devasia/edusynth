const mongoose = require('mongoose');

const CaptchaSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  status: { type: String, required: true },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Captcha', CaptchaSchema);
