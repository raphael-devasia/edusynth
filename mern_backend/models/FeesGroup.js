const mongoose = require('mongoose');

const FeesGroupSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  description: { type: String },
  is_active: { type: Boolean, default: true },
  remarks: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('FeesGroup', FeesGroupSchema);
