const ItemStock = require('../models/ItemStock');

// Create a new item stock
exports.createItemStock = async (req, res) => {
  try {
    const itemStock = new ItemStock(req.body);
    await itemStock.save();
    res.status(201).json(itemStock);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all item stocks or by ID
exports.getItemStocks = async (req, res) => {
  try {
    const { id } = req.query;
    if (id) {
      const itemStock = await ItemStock.findById(id)
        .populate('item_id supplier_id store_id');
      if (!itemStock) return res.status(404).json({ error: 'ItemStock not found' });
      res.json(itemStock);
    } else {
      const itemStocks = await ItemStock.find()
        .populate('item_id supplier_id store_id');
      res.json(itemStocks);
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update an item stock
exports.updateItemStock = async (req, res) => {
  try {
    const itemStock = await ItemStock.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!itemStock) return res.status(404).json({ error: 'ItemStock not found' });
    res.json(itemStock);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete an item stock
exports.deleteItemStock = async (req, res) => {
  try {
    const itemStock = await ItemStock.findByIdAndDelete(req.params.id);
    if (!itemStock) return res.status(404).json({ error: 'ItemStock not found' });
    res.json({ message: 'ItemStock deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
