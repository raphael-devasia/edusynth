const ExamGroupStudent = require('../models/ExamGroupStudent');

// Create a new exam group student
exports.createExamGroupStudent = async (req, res) => {
  try {
    const examGroupStudent = new ExamGroupStudent(req.body);
    await examGroupStudent.save();
    res.status(201).json(examGroupStudent);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get exam group students by filters
exports.getExamGroupStudents = async (req, res) => {
  try {
    const filter = req.query || {};
    const students = await ExamGroupStudent.find(filter)
      .populate('exam_group_id student_id class_id section_id batch_id exam_id student_session_id');
    res.json(students);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update an exam group student
exports.updateExamGroupStudent = async (req, res) => {
  try {
    const examGroupStudent = await ExamGroupStudent.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!examGroupStudent) return res.status(404).json({ error: 'ExamGroupStudent not found' });
    res.json(examGroupStudent);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete an exam group student
exports.deleteExamGroupStudent = async (req, res) => {
  try {
    const examGroupStudent = await ExamGroupStudent.findByIdAndDelete(req.params.id);
    if (!examGroupStudent) return res.status(404).json({ error: 'ExamGroupStudent not found' });
    res.json({ message: 'ExamGroupStudent deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
