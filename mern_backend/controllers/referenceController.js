const Reference = require('../models/Reference');

// Create a new reference
exports.createReference = async (req, res) => {
  try {
    const reference = new Reference(req.body);
    await reference.save();
    res.status(201).json(reference);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all references
exports.getAllReferences = async (req, res) => {
  try {
    const references = await Reference.find();
    res.json(references);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get a reference by ID
exports.getReferenceById = async (req, res) => {
  try {
    const reference = await Reference.findById(req.params.id);
    if (!reference) return res.status(404).json({ error: 'Reference not found' });
    res.json(reference);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update a reference
exports.updateReference = async (req, res) => {
  try {
    const reference = await Reference.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!reference) return res.status(404).json({ error: 'Reference not found' });
    res.json(reference);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete a reference
exports.deleteReference = async (req, res) => {
  try {
    const reference = await Reference.findByIdAndDelete(req.params.id);
    if (!reference) return res.status(404).json({ error: 'Reference not found' });
    res.json({ message: 'Reference deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
