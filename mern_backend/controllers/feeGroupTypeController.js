const FeeGroupType = require('../models/FeeGroupType');

// Create a new fee group type
exports.createFeeGroupType = async (req, res) => {
  try {
    const feeGroupType = new FeeGroupType(req.body);
    await feeGroupType.save();
    res.status(201).json(feeGroupType);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all fee group types or by ID
exports.getFeeGroupTypes = async (req, res) => {
  try {
    const { id } = req.query;
    if (id) {
      const feeGroupType = await FeeGroupType.findById(id).populate('fee_groups_id fee_type_id');
      if (!feeGroupType) return res.status(404).json({ error: 'FeeGroupType not found' });
      res.json(feeGroupType);
    } else {
      const feeGroupTypes = await FeeGroupType.find().populate('fee_groups_id fee_type_id');
      res.json(feeGroupTypes);
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update a fee group type
exports.updateFeeGroupType = async (req, res) => {
  try {
    const feeGroupType = await FeeGroupType.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!feeGroupType) return res.status(404).json({ error: 'FeeGroupType not found' });
    res.json(feeGroupType);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete a fee group type
exports.deleteFeeGroupType = async (req, res) => {
  try {
    const feeGroupType = await FeeGroupType.findByIdAndDelete(req.params.id);
    if (!feeGroupType) return res.status(404).json({ error: 'FeeGroupType not found' });
    res.json({ message: 'FeeGroupType deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
