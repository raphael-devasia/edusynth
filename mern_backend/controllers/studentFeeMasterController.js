const StudentFeeMaster = require('../models/StudentFeeMaster');

// Create a new student fee master
exports.createStudentFeeMaster = async (req, res) => {
  try {
    const studentFeeMaster = new StudentFeeMaster(req.body);
    await studentFeeMaster.save();
    res.status(201).json(studentFeeMaster);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all student fee masters
exports.getStudentFeeMasters = async (req, res) => {
  try {
    const studentFeeMasters = await StudentFeeMaster.find().populate('student_session_id fee_session_group_id');
    res.json(studentFeeMasters);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get a student fee master by ID
exports.getStudentFeeMasterById = async (req, res) => {
  try {
    const studentFeeMaster = await StudentFeeMaster.findById(req.params.id).populate('student_session_id fee_session_group_id');
    if (!studentFeeMaster) return res.status(404).json({ error: 'StudentFeeMaster not found' });
    res.json(studentFeeMaster);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update a student fee master
exports.updateStudentFeeMaster = async (req, res) => {
  try {
    const studentFeeMaster = await StudentFeeMaster.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!studentFeeMaster) return res.status(404).json({ error: 'StudentFeeMaster not found' });
    res.json(studentFeeMaster);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete a student fee master
exports.deleteStudentFeeMaster = async (req, res) => {
  try {
    const studentFeeMaster = await StudentFeeMaster.findByIdAndDelete(req.params.id);
    if (!studentFeeMaster) return res.status(404).json({ error: 'StudentFeeMaster not found' });
    res.json({ message: 'StudentFeeMaster deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
