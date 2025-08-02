const mongoose = require('mongoose');

const FeeGroupSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  is_system: { type: Boolean, default: false },
  nature: { type: String, default: '' },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('FeeGroup', FeeGroupSchema);
