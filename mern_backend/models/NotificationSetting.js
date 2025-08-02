const mongoose = require('mongoose');

const NotificationSettingSchema = new mongoose.Schema({
  type: { type: String, required: true },
  value: { type: String, required: true },
  is_active: { type: Boolean, default: true },
  description: { type: String, default: '' }
}, { timestamps: true });

module.exports = mongoose.model('NotificationSetting', NotificationSettingSchema);
