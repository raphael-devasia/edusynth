const mongoose = require('mongoose');

const EmailTemplateSchema = new mongoose.Schema({
  title: { type: String, required: true },
  message: { type: String, required: true },
  created_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('EmailTemplate', EmailTemplateSchema);
