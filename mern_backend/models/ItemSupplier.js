const mongoose = require('mongoose');

const ItemSupplierSchema = new mongoose.Schema({
  name: { type: String, required: true },
  contact: { type: String },
  address: { type: String },
  description: { type: String },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('ItemSupplier', ItemSupplierSchema);
