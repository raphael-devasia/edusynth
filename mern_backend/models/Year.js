const mongoose = require('mongoose');

const YearSchema = new mongoose.Schema({
  year: { type: String, required: true, unique: true },
  is_active: { type: Boolean, default: true },
  remarks: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Year', YearSchema);
