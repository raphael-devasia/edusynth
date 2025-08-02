const Alumni = require('../models/Alumni');

// Create a new alumni record
exports.createAlumni = async (req, res) => {
  try {
    const alumni = new Alumni(req.body);
    await alumni.save();
    res.status(201).json(alumni);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all alumni records
exports.getAlumnis = async (req, res) => {
  try {
    const alumnis = await Alumni.find().populate('student_id');
    res.json(alumnis);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get an alumni record by ID
exports.getAlumniById = async (req, res) => {
  try {
    const alumni = await Alumni.findById(req.params.id).populate('student_id');
    if (!alumni) return res.status(404).json({ error: 'Alumni not found' });
    res.json(alumni);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update an alumni record
exports.updateAlumni = async (req, res) => {
  try {
    const alumni = await Alumni.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!alumni) return res.status(404).json({ error: 'Alumni not found' });
    res.json(alumni);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete an alumni record
exports.deleteAlumni = async (req, res) => {
  try {
    const alumni = await Alumni.findByIdAndDelete(req.params.id);
    if (!alumni) return res.status(404).json({ error: 'Alumni not found' });
    res.json({ message: 'Alumni deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
