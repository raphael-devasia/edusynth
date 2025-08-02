const mongoose = require('mongoose');

const FeeReminderSchema = new mongoose.Schema({
  type: { type: String, required: true, unique: true },
  message: { type: String },
  is_active: { type: Boolean, default: true },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('FeeReminder', FeeReminderSchema);
