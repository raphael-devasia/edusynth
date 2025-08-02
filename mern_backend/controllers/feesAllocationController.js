const FeesAllocation = require('../models/FeesAllocation');

// Create a new FeesAllocation
exports.createFeesAllocation = async (req, res) => {
  try {
    const feesAllocation = new FeesAllocation(req.body);
    await feesAllocation.save();
    res.status(201).json(feesAllocation);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all FeesAllocations
exports.getAllFeesAllocations = async (req, res) => {
  try {
    const feesAllocations = await FeesAllocation.find()
      .populate('student_id')
      .populate('fees_group_id')
      .populate('session_id');
    res.json(feesAllocations);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get FeesAllocation by ID
exports.getFeesAllocationById = async (req, res) => {
  try {
    const feesAllocation = await FeesAllocation.findById(req.params.id)
      .populate('student_id')
      .populate('fees_group_id')
      .populate('session_id');
    if (!feesAllocation) return res.status(404).json({ error: 'FeesAllocation not found' });
    res.json(feesAllocation);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update FeesAllocation
exports.updateFeesAllocation = async (req, res) => {
  try {
    const feesAllocation = await FeesAllocation.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!feesAllocation) return res.status(404).json({ error: 'FeesAllocation not found' });
    res.json(feesAllocation);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete FeesAllocation
exports.deleteFeesAllocation = async (req, res) => {
  try {
    const feesAllocation = await FeesAllocation.findByIdAndDelete(req.params.id);
    if (!feesAllocation) return res.status(404).json({ error: 'FeesAllocation not found' });
    res.json({ message: 'FeesAllocation deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
