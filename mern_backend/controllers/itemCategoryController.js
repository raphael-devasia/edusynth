const ItemCategory = require('../models/ItemCategory');

// Create a new item category
exports.createItemCategory = async (req, res) => {
  try {
    const itemCategory = new ItemCategory(req.body);
    await itemCategory.save();
    res.status(201).json(itemCategory);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all item categories or by ID
exports.getItemCategories = async (req, res) => {
  try {
    const { id } = req.query;
    if (id) {
      const itemCategory = await ItemCategory.findById(id);
      if (!itemCategory) return res.status(404).json({ error: 'Item category not found' });
      res.json(itemCategory);
    } else {
      const itemCategories = await ItemCategory.find();
      res.json(itemCategories);
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update an item category
exports.updateItemCategory = async (req, res) => {
  try {
    const itemCategory = await ItemCategory.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!itemCategory) return res.status(404).json({ error: 'Item category not found' });
    res.json(itemCategory);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete an item category
exports.deleteItemCategory = async (req, res) => {
  try {
    const itemCategory = await ItemCategory.findByIdAndDelete(req.params.id);
    if (!itemCategory) return res.status(404).json({ error: 'Item category not found' });
    res.json({ message: 'Item category deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
