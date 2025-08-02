const mongoose = require('mongoose');

const NoticeSchema = new mongoose.Schema({
  title: { type: String, required: true },
  message: { type: String, required: true },
  date: { type: Date, required: true },
  audience: { type: String }, // e.g., 'all', 'students', 'staff', etc.
  is_active: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('Notice', NoticeSchema);
