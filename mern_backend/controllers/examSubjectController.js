const ExamSubject = require('../models/ExamSubject');

// Create a new exam subject
exports.createExamSubject = async (req, res) => {
  try {
    const examSubject = new ExamSubject(req.body);
    await examSubject.save();
    res.status(201).json(examSubject);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all exam subjects or by filter
exports.getExamSubjects = async (req, res) => {
  try {
    const filter = req.query || {};
    const examSubjects = await ExamSubject.find(filter)
      .populate('exam_id subject_id');
    res.json(examSubjects);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update an exam subject
exports.updateExamSubject = async (req, res) => {
  try {
    const examSubject = await ExamSubject.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!examSubject) return res.status(404).json({ error: 'ExamSubject not found' });
    res.json(examSubject);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete an exam subject
exports.deleteExamSubject = async (req, res) => {
  try {
    const examSubject = await ExamSubject.findByIdAndDelete(req.params.id);
    if (!examSubject) return res.status(404).json({ error: 'ExamSubject not found' });
    res.json({ message: 'ExamSubject deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
