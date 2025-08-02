const mongoose = require('mongoose');

const ItemCategorySchema = new mongoose.Schema({
  item_category: { type: String, required: true },
  description: { type: String },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('ItemCategory', ItemCategorySchema);
