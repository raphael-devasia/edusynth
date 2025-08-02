const FeesGroupStudent = require('../models/FeesGroupStudent');

// Create a new FeesGroupStudent
exports.createFeesGroupStudent = async (req, res) => {
  try {
    const feesGroupStudent = new FeesGroupStudent(req.body);
    await feesGroupStudent.save();
    res.status(201).json(feesGroupStudent);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all FeesGroupStudents
exports.getAllFeesGroupStudents = async (req, res) => {
  try {
    const feesGroupStudents = await FeesGroupStudent.find()
      .populate('fees_group_id')
      .populate('student_id')
      .populate('session_id');
    res.json(feesGroupStudents);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get FeesGroupStudent by ID
exports.getFeesGroupStudentById = async (req, res) => {
  try {
    const feesGroupStudent = await FeesGroupStudent.findById(req.params.id)
      .populate('fees_group_id')
      .populate('student_id')
      .populate('session_id');
    if (!feesGroupStudent) return res.status(404).json({ error: 'FeesGroupStudent not found' });
    res.json(feesGroupStudent);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update FeesGroupStudent
exports.updateFeesGroupStudent = async (req, res) => {
  try {
    const feesGroupStudent = await FeesGroupStudent.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!feesGroupStudent) return res.status(404).json({ error: 'FeesGroupStudent not found' });
    res.json(feesGroupStudent);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete FeesGroupStudent
exports.deleteFeesGroupStudent = async (req, res) => {
  try {
    const feesGroupStudent = await FeesGroupStudent.findByIdAndDelete(req.params.id);
    if (!feesGroupStudent) return res.status(404).json({ error: 'FeesGroupStudent not found' });
    res.json({ message: 'FeesGroupStudent deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
