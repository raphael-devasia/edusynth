const DueFee = require('../models/DueFee');

// Create a new DueFee
exports.createDueFee = async (req, res) => {
  try {
    const dueFee = new DueFee(req.body);
    await dueFee.save();
    res.status(201).json(dueFee);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all DueFees
exports.getAllDueFees = async (req, res) => {
  try {
    const dueFees = await DueFee.find()
      .populate('student_id')
      .populate('session_id');
    res.json(dueFees);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get DueFee by ID
exports.getDueFeeById = async (req, res) => {
  try {
    const dueFee = await DueFee.findById(req.params.id)
      .populate('student_id')
      .populate('session_id');
    if (!dueFee) return res.status(404).json({ error: 'DueFee not found' });
    res.json(dueFee);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update DueFee
exports.updateDueFee = async (req, res) => {
  try {
    const dueFee = await DueFee.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!dueFee) return res.status(404).json({ error: 'DueFee not found' });
    res.json(dueFee);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete DueFee
exports.deleteDueFee = async (req, res) => {
  try {
    const dueFee = await DueFee.findByIdAndDelete(req.params.id);
    if (!dueFee) return res.status(404).json({ error: 'DueFee not found' });
    res.json({ message: 'DueFee deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
