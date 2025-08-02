const FeesGroup = require('../models/FeesGroup');

// Create a new fees group
exports.createFeesGroup = async (req, res) => {
  try {
    const feesGroup = new FeesGroup(req.body);
    await feesGroup.save();
    res.status(201).json(feesGroup);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all fees groups
exports.getAllFeesGroups = async (req, res) => {
  try {
    const feesGroups = await FeesGroup.find();
    res.json(feesGroups);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get fees group by ID
exports.getFeesGroupById = async (req, res) => {
  try {
    const feesGroup = await FeesGroup.findById(req.params.id);
    if (!feesGroup) return res.status(404).json({ error: 'Fees group not found' });
    res.json(feesGroup);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update fees group
exports.updateFeesGroup = async (req, res) => {
  try {
    const feesGroup = await FeesGroup.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!feesGroup) return res.status(404).json({ error: 'Fees group not found' });
    res.json(feesGroup);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete fees group
exports.deleteFeesGroup = async (req, res) => {
  try {
    const feesGroup = await FeesGroup.findByIdAndDelete(req.params.id);
    if (!feesGroup) return res.status(404).json({ error: 'Fees group not found' });
    res.json({ message: 'Fees group deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
