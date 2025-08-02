const ExamFee = require('../models/ExamFee');

// Create a new ExamFee
exports.createExamFee = async (req, res) => {
  try {
    const examFee = new ExamFee(req.body);
    await examFee.save();
    res.status(201).json(examFee);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all ExamFees
exports.getAllExamFees = async (req, res) => {
  try {
    const examFees = await ExamFee.find()
      .populate('student_id')
      .populate('exam_id');
    res.json(examFees);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get ExamFee by ID
exports.getExamFeeById = async (req, res) => {
  try {
    const examFee = await ExamFee.findById(req.params.id)
      .populate('student_id')
      .populate('exam_id');
    if (!examFee) return res.status(404).json({ error: 'ExamFee not found' });
    res.json(examFee);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update ExamFee
exports.updateExamFee = async (req, res) => {
  try {
    const examFee = await ExamFee.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!examFee) return res.status(404).json({ error: 'ExamFee not found' });
    res.json(examFee);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete ExamFee
exports.deleteExamFee = async (req, res) => {
  try {
    const examFee = await ExamFee.findByIdAndDelete(req.params.id);
    if (!examFee) return res.status(404).json({ error: 'ExamFee not found' });
    res.json({ message: 'ExamFee deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
