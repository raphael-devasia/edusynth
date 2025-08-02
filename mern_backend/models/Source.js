const mongoose = require('mongoose');

const SourceSchema = new mongoose.Schema({
  source: { type: String, required: true },
  description: { type: String, required: true }
});

module.exports = mongoose.model('Source', SourceSchema);
