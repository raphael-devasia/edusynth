const mongoose = require('mongoose');

const ItemStockSchema = new mongoose.Schema({
  item_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Item', required: true },
  supplier_id: { type: mongoose.Schema.Types.ObjectId, ref: 'ItemSupplier', required: true },
  store_id: { type: mongoose.Schema.Types.ObjectId, ref: 'ItemStore', required: true },
  quantity: { type: Number, required: true },
  purchase_date: { type: Date, required: true },
  description: { type: String },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('ItemStock', ItemStockSchema);
