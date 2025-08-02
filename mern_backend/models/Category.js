const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema({
  category: { type: String, required: true, unique: true },
  is_active: { type: String, enum: ['yes', 'no'], default: 'no' },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Category', CategorySchema);
