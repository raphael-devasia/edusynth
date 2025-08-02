const FeeSessionGroup = require('../models/FeeSessionGroup');

// Create a new fee session group
exports.createFeeSessionGroup = async (req, res) => {
  try {
    const feeSessionGroup = new FeeSessionGroup(req.body);
    await feeSessionGroup.save();
    res.status(201).json(feeSessionGroup);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all fee session groups or by ID
exports.getFeeSessionGroups = async (req, res) => {
  try {
    const { id } = req.query;
    if (id) {
      const feeSessionGroup = await FeeSessionGroup.findById(id)
        .populate('fee_groups_id session_id');
      if (!feeSessionGroup) return res.status(404).json({ error: 'FeeSessionGroup not found' });
      res.json(feeSessionGroup);
    } else {
      const feeSessionGroups = await FeeSessionGroup.find()
        .populate('fee_groups_id session_id');
      res.json(feeSessionGroups);
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update a fee session group
exports.updateFeeSessionGroup = async (req, res) => {
  try {
    const feeSessionGroup = await FeeSessionGroup.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!feeSessionGroup) return res.status(404).json({ error: 'FeeSessionGroup not found' });
    res.json(feeSessionGroup);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete a fee session group
exports.deleteFeeSessionGroup = async (req, res) => {
  try {
    const feeSessionGroup = await FeeSessionGroup.findByIdAndDelete(req.params.id);
    if (!feeSessionGroup) return res.status(404).json({ error: 'FeeSessionGroup not found' });
    res.json({ message: 'FeeSessionGroup deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
