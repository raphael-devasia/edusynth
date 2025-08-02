const StudentSibling = require('../models/StudentSibling');

// Create a new student sibling record
exports.createStudentSibling = async (req, res) => {
  try {
    const sibling = new StudentSibling(req.body);
    await sibling.save();
    res.status(201).json(sibling);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all student sibling records
exports.getAllStudentSiblings = async (req, res) => {
  try {
    const siblings = await StudentSibling.find()
      .populate('student_id', 'name')
      .populate('sibling_student_id', 'name');
    res.json(siblings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get student sibling record by ID
exports.getStudentSiblingById = async (req, res) => {
  try {
    const sibling = await StudentSibling.findById(req.params.id)
      .populate('student_id', 'name')
      .populate('sibling_student_id', 'name');
    if (!sibling) return res.status(404).json({ error: 'StudentSibling not found' });
    res.json(sibling);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update student sibling record
exports.updateStudentSibling = async (req, res) => {
  try {
    const sibling = await StudentSibling.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!sibling) return res.status(404).json({ error: 'StudentSibling not found' });
    res.json(sibling);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete student sibling record
exports.deleteStudentSibling = async (req, res) => {
  try {
    const sibling = await StudentSibling.findByIdAndDelete(req.params.id);
    if (!sibling) return res.status(404).json({ error: 'StudentSibling not found' });
    res.json({ message: 'StudentSibling deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
