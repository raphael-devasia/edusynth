const mongoose = require('mongoose');

const AddonSchema = new mongoose.Schema({
  product_id: { type: String, required: true },
  name: { type: String, required: true },
  directory: { type: String },
  current_version: { type: String },
  description: { type: String },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Addon', AddonSchema);
