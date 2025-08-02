const ItemSupplier = require('../models/ItemSupplier');

// Create a new item supplier
exports.createItemSupplier = async (req, res) => {
  try {
    const itemSupplier = new ItemSupplier(req.body);
    await itemSupplier.save();
    res.status(201).json(itemSupplier);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all item suppliers or by ID
exports.getItemSuppliers = async (req, res) => {
  try {
    const { id } = req.query;
    if (id) {
      const itemSupplier = await ItemSupplier.findById(id);
      if (!itemSupplier) return res.status(404).json({ error: 'Item supplier not found' });
      res.json(itemSupplier);
    } else {
      const itemSuppliers = await ItemSupplier.find();
      res.json(itemSuppliers);
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update an item supplier
exports.updateItemSupplier = async (req, res) => {
  try {
    const itemSupplier = await ItemSupplier.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!itemSupplier) return res.status(404).json({ error: 'Item supplier not found' });
    res.json(itemSupplier);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete an item supplier
exports.deleteItemSupplier = async (req, res) => {
  try {
    const itemSupplier = await ItemSupplier.findByIdAndDelete(req.params.id);
    if (!itemSupplier) return res.status(404).json({ error: 'Item supplier not found' });
    res.json({ message: 'Item supplier deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
