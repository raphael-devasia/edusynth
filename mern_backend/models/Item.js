const mongoose = require('mongoose');

const ItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  item_category_id: { type: mongoose.Schema.Types.ObjectId, ref: 'ItemCategory', required: true },
  unit: { type: String },
  description: { type: String },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Item', ItemSchema);
