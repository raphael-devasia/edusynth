const Section = require('../models/Section');

// Create a new section
exports.createSection = async (req, res) => {
  try {
    const section = new Section(req.body);
    await section.save();
    res.status(201).json(section);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all sections
exports.getSections = async (req, res) => {
  try {
    const sections = await Section.find().populate('class_id');
    res.json(sections);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get a section by ID
exports.getSectionById = async (req, res) => {
  try {
    const section = await Section.findById(req.params.id).populate('class_id');
    if (!section) return res.status(404).json({ error: 'Section not found' });
    res.json(section);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update a section
exports.updateSection = async (req, res) => {
  try {
    const section = await Section.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!section) return res.status(404).json({ error: 'Section not found' });
    res.json(section);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete a section
exports.deleteSection = async (req, res) => {
  try {
    const section = await Section.findByIdAndDelete(req.params.id);
    if (!section) return res.status(404).json({ error: 'Section not found' });
    res.json({ message: 'Section deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
