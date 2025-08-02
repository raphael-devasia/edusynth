const mongoose = require('mongoose');

const HolidaySchema = new mongoose.Schema({
  title: { type: String, required: true },
  date: { type: Date, required: true },
  description: { type: String },
  is_active: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('Holiday', HolidaySchema);
