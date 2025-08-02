const mongoose = require('mongoose');

const SchoolHouseSchema = new mongoose.Schema({
  house_name: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  is_active: { type: String, enum: ['yes', 'no'], required: true },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});

SchoolHouseSchema.pre('save', function(next) {
  this.updated_at = Date.now();
  next();
});

module.exports = mongoose.model('SchoolHouse', SchoolHouseSchema);
