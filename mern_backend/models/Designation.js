const mongoose = require('mongoose');

const DesignationSchema = new mongoose.Schema({
  designation: { type: String, required: true, unique: true },
  is_active: { type: Boolean, default: true },
  description: { type: String },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Designation', DesignationSchema);
