const mongoose = require('mongoose');

const VehicleRouteSchema = new mongoose.Schema({
  route_id: { type: mongoose.Schema.Types.ObjectId, ref: 'TransportRoute', default: null },
  vehicle_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Vehicle', default: null },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('VehicleRoute', VehicleRouteSchema);
