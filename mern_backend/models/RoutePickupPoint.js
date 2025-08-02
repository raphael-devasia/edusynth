const mongoose = require('mongoose');

const RoutePickupPointSchema = new mongoose.Schema({
  route_id: { type: mongoose.Schema.Types.ObjectId, ref: 'TransportRoute', required: true },
  pickup_point_id: { type: mongoose.Schema.Types.ObjectId, ref: 'PickupPoint', required: true },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('RoutePickupPoint', RoutePickupPointSchema);
