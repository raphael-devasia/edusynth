const mongoose = require('mongoose');

const InventorySchema = new mongoose.Schema({
  item_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Item', required: true },
  quantity: { type: Number, required: true },
  purchase_date: { type: Date },
  supplier_id: { type: mongoose.Schema.Types.ObjectId, ref: 'ItemSupplier' },
  store_id: { type: mongoose.Schema.Types.ObjectId, ref: 'ItemStore' },
  remarks: { type: String },
  is_active: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('Inventory', InventorySchema);
