const mongoose = require('mongoose');

const TransportRouteSchema = new mongoose.Schema({
  route_title: { type: String, required: true },
  fare: { type: Number, required: true },
  description: { type: String },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('TransportRoute', TransportRouteSchema);
