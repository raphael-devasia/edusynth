const ItemStore = require('../models/ItemStore');

// Create a new item store
exports.createItemStore = async (req, res) => {
  try {
    const itemStore = new ItemStore(req.body);
    await itemStore.save();
    res.status(201).json(itemStore);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all item stores or by ID
exports.getItemStores = async (req, res) => {
  try {
    const { id } = req.query;
    if (id) {
      const itemStore = await ItemStore.findById(id);
      if (!itemStore) return res.status(404).json({ error: 'Item store not found' });
      res.json(itemStore);
    } else {
      const itemStores = await ItemStore.find();
      res.json(itemStores);
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update an item store
exports.updateItemStore = async (req, res) => {
  try {
    const itemStore = await ItemStore.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!itemStore) return res.status(404).json({ error: 'Item store not found' });
    res.json(itemStore);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete an item store
exports.deleteItemStore = async (req, res) => {
  try {
    const itemStore = await ItemStore.findByIdAndDelete(req.params.id);
    if (!itemStore) return res.status(404).json({ error: 'Item store not found' });
    res.json({ message: 'Item store deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
