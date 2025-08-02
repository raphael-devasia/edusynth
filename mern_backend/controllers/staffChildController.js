const StaffChild = require('../models/StaffChild');

// Create a new staff child
exports.createStaffChild = async (req, res) => {
  try {
    const child = new StaffChild(req.body);
    await child.save();
    res.status(201).json(child);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all staff children
exports.getAllStaffChildren = async (req, res) => {
  try {
    const children = await StaffChild.find().populate('staff_id', 'name');
    res.json(children);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get staff child by ID
exports.getStaffChildById = async (req, res) => {
  try {
    const child = await StaffChild.findById(req.params.id).populate('staff_id', 'name');
    if (!child) return res.status(404).json({ error: 'StaffChild not found' });
    res.json(child);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update staff child
exports.updateStaffChild = async (req, res) => {
  try {
    const child = await StaffChild.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!child) return res.status(404).json({ error: 'StaffChild not found' });
    res.json(child);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete staff child
exports.deleteStaffChild = async (req, res) => {
  try {
    const child = await StaffChild.findByIdAndDelete(req.params.id);
    if (!child) return res.status(404).json({ error: 'StaffChild not found' });
    res.json({ message: 'StaffChild deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
