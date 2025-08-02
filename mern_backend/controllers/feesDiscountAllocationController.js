const FeesDiscountAllocation = require('../models/FeesDiscountAllocation');

// Create a new FeesDiscountAllocation
exports.createFeesDiscountAllocation = async (req, res) => {
  try {
    const feesDiscountAllocation = new FeesDiscountAllocation(req.body);
    await feesDiscountAllocation.save();
    res.status(201).json(feesDiscountAllocation);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all FeesDiscountAllocations
exports.getAllFeesDiscountAllocations = async (req, res) => {
  try {
    const feesDiscountAllocations = await FeesDiscountAllocation.find()
      .populate('student_id')
      .populate('discount_id')
      .populate('session_id');
    res.json(feesDiscountAllocations);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get FeesDiscountAllocation by ID
exports.getFeesDiscountAllocationById = async (req, res) => {
  try {
    const feesDiscountAllocation = await FeesDiscountAllocation.findById(req.params.id)
      .populate('student_id')
      .populate('discount_id')
      .populate('session_id');
    if (!feesDiscountAllocation) return res.status(404).json({ error: 'FeesDiscountAllocation not found' });
    res.json(feesDiscountAllocation);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update FeesDiscountAllocation
exports.updateFeesDiscountAllocation = async (req, res) => {
  try {
    const feesDiscountAllocation = await FeesDiscountAllocation.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!feesDiscountAllocation) return res.status(404).json({ error: 'FeesDiscountAllocation not found' });
    res.json(feesDiscountAllocation);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete FeesDiscountAllocation
exports.deleteFeesDiscountAllocation = async (req, res) => {
  try {
    const feesDiscountAllocation = await FeesDiscountAllocation.findByIdAndDelete(req.params.id);
    if (!feesDiscountAllocation) return res.status(404).json({ error: 'FeesDiscountAllocation not found' });
    res.json({ message: 'FeesDiscountAllocation deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
