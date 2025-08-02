const Designation = require('../models/Designation');

// Create a new designation
exports.createDesignation = async (req, res) => {
  try {
    const designation = new Designation(req.body);
    await designation.save();
    res.status(201).json(designation);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all designations or by ID
exports.getDesignations = async (req, res) => {
  try {
    const { id } = req.query;
    if (id) {
      const designation = await Designation.findById(id);
      if (!designation) return res.status(404).json({ error: 'Designation not found' });
      res.json(designation);
    } else {
      const designations = await Designation.find();
      res.json(designations);
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update a designation
exports.updateDesignation = async (req, res) => {
  try {
    const designation = await Designation.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!designation) return res.status(404).json({ error: 'Designation not found' });
    res.json(designation);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete a designation
exports.deleteDesignation = async (req, res) => {
  try {
    const designation = await Designation.findByIdAndDelete(req.params.id);
    if (!designation) return res.status(404).json({ error: 'Designation not found' });
    res.json({ message: 'Designation deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
