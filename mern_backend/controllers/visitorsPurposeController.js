const VisitorsPurpose = require('../models/VisitorsPurpose');

// Create new purpose
exports.createPurpose = async (req, res) => {
  try {
    const purpose = new VisitorsPurpose(req.body);
    await purpose.save();
    res.status(201).json(purpose);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all purposes
exports.getAllPurposes = async (req, res) => {
  try {
    const purposes = await VisitorsPurpose.find();
    res.json(purposes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get purpose by ID
exports.getPurposeById = async (req, res) => {
  try {
    const purpose = await VisitorsPurpose.findById(req.params.id);
    if (!purpose) return res.status(404).json({ error: 'Purpose not found' });
    res.json(purpose);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update purpose
exports.updatePurpose = async (req, res) => {
  try {
    const purpose = await VisitorsPurpose.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!purpose) return res.status(404).json({ error: 'Purpose not found' });
    res.json(purpose);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete purpose
exports.deletePurpose = async (req, res) => {
  try {
    const purpose = await VisitorsPurpose.findByIdAndDelete(req.params.id);
    if (!purpose) return res.status(404).json({ error: 'Purpose not found' });
    res.json({ message: 'Purpose deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
