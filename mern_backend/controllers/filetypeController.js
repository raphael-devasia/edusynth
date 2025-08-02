const Filetype = require('../models/Filetype');

// Create a new filetype
exports.createFiletype = async (req, res) => {
  try {
    const filetype = new Filetype(req.body);
    await filetype.save();
    res.status(201).json(filetype);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all filetypes
exports.getFiletypes = async (req, res) => {
  try {
    const filetypes = await Filetype.find();
    res.json(filetypes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get a filetype by ID
exports.getFiletypeById = async (req, res) => {
  try {
    const filetype = await Filetype.findById(req.params.id);
    if (!filetype) return res.status(404).json({ error: 'Filetype not found' });
    res.json(filetype);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update a filetype
exports.updateFiletype = async (req, res) => {
  try {
    const filetype = await Filetype.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!filetype) return res.status(404).json({ error: 'Filetype not found' });
    res.json(filetype);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete a filetype
exports.deleteFiletype = async (req, res) => {
  try {
    const filetype = await Filetype.findByIdAndDelete(req.params.id);
    if (!filetype) return res.status(404).json({ error: 'Filetype not found' });
    res.json({ message: 'Filetype deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
