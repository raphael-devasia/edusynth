const StudentFee = require('../models/StudentFee');

// Create a new student fee
exports.createStudentFee = async (req, res) => {
  try {
    const studentFee = new StudentFee(req.body);
    await studentFee.save();
    res.status(201).json(studentFee);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all student fees
exports.getStudentFees = async (req, res) => {
  try {
    const studentFees = await StudentFee.find().populate('student_session_id feemaster_id');
    res.json(studentFees);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get a student fee by ID
exports.getStudentFeeById = async (req, res) => {
  try {
    const studentFee = await StudentFee.findById(req.params.id).populate('student_session_id feemaster_id');
    if (!studentFee) return res.status(404).json({ error: 'StudentFee not found' });
    res.json(studentFee);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update a student fee
exports.updateStudentFee = async (req, res) => {
  try {
    const studentFee = await StudentFee.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!studentFee) return res.status(404).json({ error: 'StudentFee not found' });
    res.json(studentFee);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete a student fee
exports.deleteStudentFee = async (req, res) => {
  try {
    const studentFee = await StudentFee.findByIdAndDelete(req.params.id);
    if (!studentFee) return res.status(404).json({ error: 'StudentFee not found' });
    res.json({ message: 'StudentFee deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
