const ExamResult = require('../models/ExamResult');

// Create a new exam result
exports.createExamResult = async (req, res) => {
  try {
    const examResult = new ExamResult(req.body);
    await examResult.save();
    res.status(201).json(examResult);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all exam results or by ID
exports.getExamResults = async (req, res) => {
  try {
    const { id } = req.query;
    if (id) {
      const examResult = await ExamResult.findById(id);
      if (!examResult) return res.status(404).json({ error: 'ExamResult not found' });
      res.json(examResult);
    } else {
      const examResults = await ExamResult.find().sort({ _id: 1 });
      res.json(examResults);
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update an exam result
exports.updateExamResult = async (req, res) => {
  try {
    const examResult = await ExamResult.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!examResult) return res.status(404).json({ error: 'ExamResult not found' });
    res.json(examResult);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete an exam result
exports.deleteExamResult = async (req, res) => {
  try {
    const examResult = await ExamResult.findByIdAndDelete(req.params.id);
    if (!examResult) return res.status(404).json({ error: 'ExamResult not found' });
    res.json({ message: 'ExamResult deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
