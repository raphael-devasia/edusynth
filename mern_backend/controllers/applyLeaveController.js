const ApplyLeave = require('../models/ApplyLeave');

// Create a new leave application
exports.createApplyLeave = async (req, res) => {
  try {
    const applyLeave = new ApplyLeave(req.body);
    await applyLeave.save();
    res.status(201).json(applyLeave);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all leave applications
exports.getApplyLeaves = async (req, res) => {
  try {
    const applyLeaves = await ApplyLeave.find().populate('student_session_id approve_by');
    res.json(applyLeaves);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get a leave application by ID
exports.getApplyLeaveById = async (req, res) => {
  try {
    const applyLeave = await ApplyLeave.findById(req.params.id).populate('student_session_id approve_by');
    if (!applyLeave) return res.status(404).json({ error: 'ApplyLeave not found' });
    res.json(applyLeave);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update a leave application
exports.updateApplyLeave = async (req, res) => {
  try {
    const applyLeave = await ApplyLeave.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!applyLeave) return res.status(404).json({ error: 'ApplyLeave not found' });
    res.json(applyLeave);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete a leave application
exports.deleteApplyLeave = async (req, res) => {
  try {
    const applyLeave = await ApplyLeave.findByIdAndDelete(req.params.id);
    if (!applyLeave) return res.status(404).json({ error: 'ApplyLeave not found' });
    res.json({ message: 'ApplyLeave deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
