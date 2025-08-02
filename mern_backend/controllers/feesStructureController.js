const FeesStructure = require('../models/FeesStructure');

// Create a new FeesStructure
exports.createFeesStructure = async (req, res) => {
  try {
    const feesStructure = new FeesStructure(req.body);
    await feesStructure.save();
    res.status(201).json(feesStructure);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all FeesStructures
exports.getAllFeesStructures = async (req, res) => {
  try {
    const feesStructures = await FeesStructure.find()
      .populate('fees_group_id')
      .populate('fees_type_id')
      .populate('session_id');
    res.json(feesStructures);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get FeesStructure by ID
exports.getFeesStructureById = async (req, res) => {
  try {
    const feesStructure = await FeesStructure.findById(req.params.id)
      .populate('fees_group_id')
      .populate('fees_type_id')
      .populate('session_id');
    if (!feesStructure) return res.status(404).json({ error: 'FeesStructure not found' });
    res.json(feesStructure);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update FeesStructure
exports.updateFeesStructure = async (req, res) => {
  try {
    const feesStructure = await FeesStructure.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!feesStructure) return res.status(404).json({ error: 'FeesStructure not found' });
    res.json(feesStructure);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete FeesStructure
exports.deleteFeesStructure = async (req, res) => {
  try {
    const feesStructure = await FeesStructure.findByIdAndDelete(req.params.id);
    if (!feesStructure) return res.status(404).json({ error: 'FeesStructure not found' });
    res.json({ message: 'FeesStructure deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
