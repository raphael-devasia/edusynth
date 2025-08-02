const FeeGroup = require('../models/FeeGroup');

// Create a new fee group
exports.createFeeGroup = async (req, res) => {
  try {
    const feeGroup = new FeeGroup(req.body);
    await feeGroup.save();
    res.status(201).json(feeGroup);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all fee groups or by ID
exports.getFeeGroups = async (req, res) => {
  try {
    const { id } = req.query;
    if (id) {
      const feeGroup = await FeeGroup.findById(id);
      if (!feeGroup) return res.status(404).json({ error: 'FeeGroup not found' });
      res.json(feeGroup);
    } else {
      const feeGroups = await FeeGroup.find().sort({ _id: 1 });
      res.json(feeGroups);
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update a fee group
exports.updateFeeGroup = async (req, res) => {
  try {
    const feeGroup = await FeeGroup.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!feeGroup) return res.status(404).json({ error: 'FeeGroup not found' });
    res.json(feeGroup);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete a fee group
exports.deleteFeeGroup = async (req, res) => {
  try {
    const feeGroup = await FeeGroup.findByIdAndDelete(req.params.id);
    if (!feeGroup) return res.status(404).json({ error: 'FeeGroup not found' });
    res.json({ message: 'FeeGroup deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
