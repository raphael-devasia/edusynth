const Source = require('../models/Source');

// Create a new source
exports.createSource = async (req, res) => {
  try {
    const source = new Source(req.body);
    await source.save();
    res.status(201).json(source);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all sources
exports.getSources = async (req, res) => {
  try {
    const sources = await Source.find();
    res.json(sources);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get a single source by ID
exports.getSourceById = async (req, res) => {
  try {
    const source = await Source.findById(req.params.id);
    if (!source) return res.status(404).json({ error: 'Source not found' });
    res.json(source);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update a source
exports.updateSource = async (req, res) => {
  try {
    const source = await Source.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!source) return res.status(404).json({ error: 'Source not found' });
    res.json(source);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete a source
exports.deleteSource = async (req, res) => {
  try {
    const source = await Source.findByIdAndDelete(req.params.id);
    if (!source) return res.status(404).json({ error: 'Source not found' });
    res.json({ message: 'Source deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
