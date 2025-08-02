const mongoose = require('mongoose');

const PickupPointSchema = new mongoose.Schema({
  name: { type: String, required: true },
  address: { type: String },
  description: { type: String },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('PickupPoint', PickupPointSchema);
