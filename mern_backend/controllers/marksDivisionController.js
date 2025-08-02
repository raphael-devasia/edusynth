const MarksDivision = require('../models/MarksDivision');

// Create a new marks division
exports.createMarksDivision = async (req, res) => {
  try {
    const marksDivision = new MarksDivision(req.body);
    await marksDivision.save();
    res.status(201).json(marksDivision);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all marks divisions or by ID
exports.getMarksDivisions = async (req, res) => {
  try {
    const { id } = req.query;
    if (id) {
      const marksDivision = await MarksDivision.findById(id);
      if (!marksDivision) return res.status(404).json({ error: 'MarksDivision not found' });
      res.json(marksDivision);
    } else {
      const marksDivisions = await MarksDivision.find().sort({ _id: 1 });
      res.json(marksDivisions);
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update a marks division
exports.updateMarksDivision = async (req, res) => {
  try {
    const marksDivision = await MarksDivision.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!marksDivision) return res.status(404).json({ error: 'MarksDivision not found' });
    res.json(marksDivision);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete a marks division
exports.deleteMarksDivision = async (req, res) => {
  try {
    const marksDivision = await MarksDivision.findByIdAndDelete(req.params.id);
    if (!marksDivision) return res.status(404).json({ error: 'MarksDivision not found' });
    res.json({ message: 'MarksDivision deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
