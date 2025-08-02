const FineMaster = require('../models/FineMaster');

// Create a new FineMaster
exports.createFineMaster = async (req, res) => {
  try {
    const fineMaster = new FineMaster(req.body);
    await fineMaster.save();
    res.status(201).json(fineMaster);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all FineMasters
exports.getAllFineMasters = async (req, res) => {
  try {
    const fineMasters = await FineMaster.find();
    res.json(fineMasters);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get FineMaster by ID
exports.getFineMasterById = async (req, res) => {
  try {
    const fineMaster = await FineMaster.findById(req.params.id);
    if (!fineMaster) return res.status(404).json({ error: 'FineMaster not found' });
    res.json(fineMaster);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update FineMaster
exports.updateFineMaster = async (req, res) => {
  try {
    const fineMaster = await FineMaster.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!fineMaster) return res.status(404).json({ error: 'FineMaster not found' });
    res.json(fineMaster);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete FineMaster
exports.deleteFineMaster = async (req, res) => {
  try {
    const fineMaster = await FineMaster.findByIdAndDelete(req.params.id);
    if (!fineMaster) return res.status(404).json({ error: 'FineMaster not found' });
    res.json({ message: 'FineMaster deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
