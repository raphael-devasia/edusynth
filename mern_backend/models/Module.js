const mongoose = require('mongoose');

const ModuleSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, default: '' },
  is_active: { type: Boolean, default: true },
  order: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model('Module', ModuleSchema);
