const mongoose = require('mongoose');

const FeeTypeSchema = new mongoose.Schema({
  type: { type: String, required: true },
  feecategory_id: { type: mongoose.Schema.Types.ObjectId, ref: 'FeeCategory', required: true },
  code: { type: String },
  description: { type: String },
  is_system: { type: Boolean, default: false },
  nature: { type: String, default: '' },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('FeeType', FeeTypeSchema);
