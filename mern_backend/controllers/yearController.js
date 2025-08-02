const Year = require('../models/Year');

// Create a new year
exports.createYear = async (req, res) => {
  try {
    const year = new Year(req.body);
    await year.save();
    res.status(201).json(year);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all years
exports.getAllYears = async (req, res) => {
  try {
    const years = await Year.find();
    res.json(years);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get year by ID
exports.getYearById = async (req, res) => {
  try {
    const year = await Year.findById(req.params.id);
    if (!year) return res.status(404).json({ error: 'Year not found' });
    res.json(year);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update year
exports.updateYear = async (req, res) => {
  try {
    const year = await Year.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!year) return res.status(404).json({ error: 'Year not found' });
    res.json(year);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete year
exports.deleteYear = async (req, res) => {
  try {
    const year = await Year.findByIdAndDelete(req.params.id);
    if (!year) return res.status(404).json({ error: 'Year not found' });
    res.json({ message: 'Year deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
