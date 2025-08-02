const HostelDues = require('../models/HostelDues');

// Create a new HostelDues
exports.createHostelDues = async (req, res) => {
  try {
    const hostelDues = new HostelDues(req.body);
    await hostelDues.save();
    res.status(201).json(hostelDues);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all HostelDues
exports.getAllHostelDues = async (req, res) => {
  try {
    const hostelDues = await HostelDues.find()
      .populate('student_id')
      .populate('hostel_id');
    res.json(hostelDues);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get HostelDues by ID
exports.getHostelDuesById = async (req, res) => {
  try {
    const hostelDues = await HostelDues.findById(req.params.id)
      .populate('student_id')
      .populate('hostel_id');
    if (!hostelDues) return res.status(404).json({ error: 'HostelDues not found' });
    res.json(hostelDues);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update HostelDues
exports.updateHostelDues = async (req, res) => {
  try {
    const hostelDues = await HostelDues.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!hostelDues) return res.status(404).json({ error: 'HostelDues not found' });
    res.json(hostelDues);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete HostelDues
exports.deleteHostelDues = async (req, res) => {
  try {
    const hostelDues = await HostelDues.findByIdAndDelete(req.params.id);
    if (!hostelDues) return res.status(404).json({ error: 'HostelDues not found' });
    res.json({ message: 'HostelDues deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
