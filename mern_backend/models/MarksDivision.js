const mongoose = require('mongoose');

const MarksDivisionSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('MarksDivision', MarksDivisionSchema);
