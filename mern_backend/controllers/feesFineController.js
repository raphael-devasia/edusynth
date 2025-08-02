const FeesFine = require('../models/FeesFine');

// Create a new FeesFine
exports.createFeesFine = async (req, res) => {
  try {
    const feesFine = new FeesFine(req.body);
    await feesFine.save();
    res.status(201).json(feesFine);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all FeesFines
exports.getAllFeesFines = async (req, res) => {
  try {
    const feesFines = await FeesFine.find()
      .populate('student_id')
      .populate('fees_type_id');
    res.json(feesFines);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get FeesFine by ID
exports.getFeesFineById = async (req, res) => {
  try {
    const feesFine = await FeesFine.findById(req.params.id)
      .populate('student_id')
      .populate('fees_type_id');
    if (!feesFine) return res.status(404).json({ error: 'FeesFine not found' });
    res.json(feesFine);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update FeesFine
exports.updateFeesFine = async (req, res) => {
  try {
    const feesFine = await FeesFine.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!feesFine) return res.status(404).json({ error: 'FeesFine not found' });
    res.json(feesFine);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete FeesFine
exports.deleteFeesFine = async (req, res) => {
  try {
    const feesFine = await FeesFine.findByIdAndDelete(req.params.id);
    if (!feesFine) return res.status(404).json({ error: 'FeesFine not found' });
    res.json({ message: 'FeesFine deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
