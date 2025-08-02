const Work = require('../models/Work');

// Create a new work
exports.createWork = async (req, res) => {
  try {
    const work = new Work(req.body);
    await work.save();
    res.status(201).json(work);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all work
exports.getAllWork = async (req, res) => {
  try {
    const work = await Work.find().populate('assigned_to', 'name');
    res.json(work);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get work by ID
exports.getWorkById = async (req, res) => {
  try {
    const work = await Work.findById(req.params.id).populate('assigned_to', 'name');
    if (!work) return res.status(404).json({ error: 'Work not found' });
    res.json(work);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update work
exports.updateWork = async (req, res) => {
  try {
    const work = await Work.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!work) return res.status(404).json({ error: 'Work not found' });
    res.json(work);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete work
exports.deleteWork = async (req, res) => {
  try {
    const work = await Work.findByIdAndDelete(req.params.id);
    if (!work) return res.status(404).json({ error: 'Work not found' });
    res.json({ message: 'Work deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
