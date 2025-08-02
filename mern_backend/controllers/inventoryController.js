const Inventory = require('../models/Inventory');

// Create a new Inventory record
exports.createInventory = async (req, res) => {
  try {
    const inventory = new Inventory(req.body);
    await inventory.save();
    res.status(201).json(inventory);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all Inventory records
exports.getAllInventories = async (req, res) => {
  try {
    const inventories = await Inventory.find()
      .populate('item_id')
      .populate('supplier_id')
      .populate('store_id');
    res.json(inventories);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get Inventory by ID
exports.getInventoryById = async (req, res) => {
  try {
    const inventory = await Inventory.findById(req.params.id)
      .populate('item_id')
      .populate('supplier_id')
      .populate('store_id');
    if (!inventory) return res.status(404).json({ error: 'Inventory not found' });
    res.json(inventory);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update Inventory
exports.updateInventory = async (req, res) => {
  try {
    const inventory = await Inventory.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!inventory) return res.status(404).json({ error: 'Inventory not found' });
    res.json(inventory);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete Inventory
exports.deleteInventory = async (req, res) => {
  try {
    const inventory = await Inventory.findByIdAndDelete(req.params.id);
    if (!inventory) return res.status(404).json({ error: 'Inventory not found' });
    res.json({ message: 'Inventory deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
