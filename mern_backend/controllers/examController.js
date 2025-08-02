const Exam = require('../models/Exam');

// Create a new exam
exports.createExam = async (req, res) => {
  try {
    const exam = new Exam(req.body);
    await exam.save();
    res.status(201).json(exam);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all exams or by ID
exports.getExams = async (req, res) => {
  try {
    const { id } = req.query;
    if (id) {
      const exam = await Exam.findById(id);
      if (!exam) return res.status(404).json({ error: 'Exam not found' });
      res.json(exam);
    } else {
      const exams = await Exam.find().sort({ _id: 1 });
      res.json(exams);
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update an exam
exports.updateExam = async (req, res) => {
  try {
    const exam = await Exam.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!exam) return res.status(404).json({ error: 'Exam not found' });
    res.json(exam);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete an exam
exports.deleteExam = async (req, res) => {
  try {
    const exam = await Exam.findByIdAndDelete(req.params.id);
    if (!exam) return res.status(404).json({ error: 'Exam not found' });
    res.json({ message: 'Exam deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
