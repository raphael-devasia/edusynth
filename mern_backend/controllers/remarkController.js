const Remark = require('../models/Remark');

// Create a new Remark
exports.createRemark = async (req, res) => {
  try {
    const remark = new Remark(req.body);
    await remark.save();
    res.status(201).json(remark);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all Remarks
exports.getAllRemarks = async (req, res) => {
  try {
    const remarks = await Remark.find().populate('student_id').populate('given_by');
    res.json(remarks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get Remark by ID
exports.getRemarkById = async (req, res) => {
  try {
    const remark = await Remark.findById(req.params.id).populate('student_id').populate('given_by');
    if (!remark) return res.status(404).json({ error: 'Remark not found' });
    res.json(remark);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update Remark
exports.updateRemark = async (req, res) => {
  try {
    const remark = await Remark.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!remark) return res.status(404).json({ error: 'Remark not found' });
    res.json(remark);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete Remark
exports.deleteRemark = async (req, res) => {
  try {
    const remark = await Remark.findByIdAndDelete(req.params.id);
    if (!remark) return res.status(404).json({ error: 'Remark not found' });
    res.json({ message: 'Remark deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
