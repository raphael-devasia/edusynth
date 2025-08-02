const mongoose = require('mongoose');

const ReferenceSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, default: '' },
  is_active: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('Reference', ReferenceSchema);
