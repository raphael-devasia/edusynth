const mongoose = require('mongoose');

const VehicleSchema = new mongoose.Schema({
  vehicle_no: { type: String, required: true, unique: true },
  vehicle_model: { type: String },
  driver_name: { type: String },
  driver_licence: { type: String },
  driver_contact: { type: String },
  note: { type: String },
  registration_number: { type: String },
  chasis_number: { type: String },
  max_seating_capacity: { type: Number },
  manufacture_year: { type: String },
  vehicle_photo: { type: String }, // path or filename
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Vehicle', VehicleSchema);
