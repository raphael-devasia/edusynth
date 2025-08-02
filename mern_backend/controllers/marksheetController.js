const Marksheet = require('../models/Marksheet');

// Create a new marksheet template
exports.createMarksheet = async (req, res) => {
  try {
    const marksheet = new Marksheet(req.body);
    await marksheet.save();
    res.status(201).json(marksheet);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all marksheet templates
exports.getMarksheets = async (req, res) => {
  try {
    const marksheets = await Marksheet.find();
    res.json(marksheets);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get a marksheet template by ID
exports.getMarksheetById = async (req, res) => {
  try {
    const marksheet = await Marksheet.findById(req.params.id);
    if (!marksheet) return res.status(404).json({ error: 'Marksheet not found' });
    res.json(marksheet);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update a marksheet template
exports.updateMarksheet = async (req, res) => {
  try {
    const marksheet = await Marksheet.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!marksheet) return res.status(404).json({ error: 'Marksheet not found' });
    res.json(marksheet);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete a marksheet template
exports.deleteMarksheet = async (req, res) => {
  try {
    const marksheet = await Marksheet.findByIdAndDelete(req.params.id);
    if (!marksheet) return res.status(404).json({ error: 'Marksheet not found' });
    res.json({ message: 'Marksheet deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
