const ExamStudent = require('../models/ExamStudent');

// Create a new exam student
exports.createExamStudent = async (req, res) => {
  try {
    const examStudent = new ExamStudent(req.body);
    await examStudent.save();
    res.status(201).json(examStudent);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all exam students or by filter
exports.getExamStudents = async (req, res) => {
  try {
    const filter = req.query || {};
    const examStudents = await ExamStudent.find(filter)
      .populate('student_id class_id section_id exam_id student_session_id');
    res.json(examStudents);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update an exam student
exports.updateExamStudent = async (req, res) => {
  try {
    const examStudent = await ExamStudent.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!examStudent) return res.status(404).json({ error: 'ExamStudent not found' });
    res.json(examStudent);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete an exam student
exports.deleteExamStudent = async (req, res) => {
  try {
    const examStudent = await ExamStudent.findByIdAndDelete(req.params.id);
    if (!examStudent) return res.status(404).json({ error: 'ExamStudent not found' });
    res.json({ message: 'ExamStudent deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
