const FeesReceipt = require('../models/FeesReceipt');

// Create a new FeesReceipt
exports.createFeesReceipt = async (req, res) => {
  try {
    const feesReceipt = new FeesReceipt(req.body);
    await feesReceipt.save();
    res.status(201).json(feesReceipt);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all FeesReceipts
exports.getAllFeesReceipts = async (req, res) => {
  try {
    const feesReceipts = await FeesReceipt.find()
      .populate('student_id')
      .populate('fees_type_id');
    res.json(feesReceipts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get FeesReceipt by ID
exports.getFeesReceiptById = async (req, res) => {
  try {
    const feesReceipt = await FeesReceipt.findById(req.params.id)
      .populate('student_id')
      .populate('fees_type_id');
    if (!feesReceipt) return res.status(404).json({ error: 'FeesReceipt not found' });
    res.json(feesReceipt);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update FeesReceipt
exports.updateFeesReceipt = async (req, res) => {
  try {
    const feesReceipt = await FeesReceipt.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!feesReceipt) return res.status(404).json({ error: 'FeesReceipt not found' });
    res.json(feesReceipt);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete FeesReceipt
exports.deleteFeesReceipt = async (req, res) => {
  try {
    const feesReceipt = await FeesReceipt.findByIdAndDelete(req.params.id);
    if (!feesReceipt) return res.status(404).json({ error: 'FeesReceipt not found' });
    res.json({ message: 'FeesReceipt deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
