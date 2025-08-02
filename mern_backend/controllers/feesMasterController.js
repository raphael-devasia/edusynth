const FeesMaster = require('../models/FeesMaster');

// Create a new FeesMaster
exports.createFeesMaster = async (req, res) => {
  try {
    const feesMaster = new FeesMaster(req.body);
    await feesMaster.save();
    res.status(201).json(feesMaster);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all FeesMasters
exports.getAllFeesMasters = async (req, res) => {
  try {
    const feesMasters = await FeesMaster.find()
      .populate('fees_group_id')
      .populate('fees_type_id')
      .populate('session_id');
    res.json(feesMasters);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get FeesMaster by ID
exports.getFeesMasterById = async (req, res) => {
  try {
    const feesMaster = await FeesMaster.findById(req.params.id)
      .populate('fees_group_id')
      .populate('fees_type_id')
      .populate('session_id');
    if (!feesMaster) return res.status(404).json({ error: 'FeesMaster not found' });
    res.json(feesMaster);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update FeesMaster
exports.updateFeesMaster = async (req, res) => {
  try {
    const feesMaster = await FeesMaster.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!feesMaster) return res.status(404).json({ error: 'FeesMaster not found' });
    res.json(feesMaster);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete FeesMaster
exports.deleteFeesMaster = async (req, res) => {
  try {
    const feesMaster = await FeesMaster.findByIdAndDelete(req.params.id);
    if (!feesMaster) return res.status(404).json({ error: 'FeesMaster not found' });
    res.json({ message: 'FeesMaster deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
