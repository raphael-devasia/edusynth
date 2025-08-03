const OnlineAdmission = require('../models/OnlineAdmission');

// Admin: List all online admissions
exports.getAll = async (req, res) => {
  try {
    const admissions = await OnlineAdmission.find().sort({ created_at: -1 });
    res.json(admissions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Admin: Get single admission
exports.getOne = async (req, res) => {
  try {
    const admission = await OnlineAdmission.findById(req.params.id);
    if (!admission) return res.status(404).json({ error: 'Not found' });
    res.json(admission);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Admin: Approve/Reject/Update admission
exports.update = async (req, res) => {
  try {
    const updated = await OnlineAdmission.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Admin: Delete admission
exports.delete = async (req, res) => {
  try {
    await OnlineAdmission.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Public: Submit new application
exports.submit = async (req, res) => {
  try {
    const admission = new OnlineAdmission(req.body);
    await admission.save();
    res.status(201).json(admission);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
