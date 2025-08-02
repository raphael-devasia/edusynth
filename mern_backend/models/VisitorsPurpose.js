const mongoose = require('mongoose');

const VisitorsPurposeSchema = new mongoose.Schema({
  visitors_purpose: { type: String, required: true },
  description: { type: String },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});

VisitorsPurposeSchema.pre('save', function(next) {
  this.updated_at = Date.now();
  next();
});

module.exports = mongoose.model('VisitorsPurpose', VisitorsPurposeSchema);
