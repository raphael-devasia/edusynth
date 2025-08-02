const mongoose = require('mongoose');

const MarksheetSchema = new mongoose.Schema({
  name: { type: String, required: true },
  template: { type: String },
  description: { type: String },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Marksheet', MarksheetSchema);
