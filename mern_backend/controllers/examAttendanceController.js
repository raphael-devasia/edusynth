const ExamAttendance = require('../models/ExamAttendance');

// Create a new exam attendance record
exports.createExamAttendance = async (req, res) => {
  try {
    const examAttendance = new ExamAttendance(req.body);
    await examAttendance.save();
    res.status(201).json(examAttendance);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all exam attendance records
exports.getAllExamAttendances = async (req, res) => {
  try {
    const attendances = await ExamAttendance.find()
      .populate('exam_id')
      .populate('class_id')
      .populate('section_id')
      .populate('subject_id')
      .populate('student_id');
    res.json(attendances);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get exam attendance by ID
exports.getExamAttendanceById = async (req, res) => {
  try {
    const attendance = await ExamAttendance.findById(req.params.id)
      .populate('exam_id')
      .populate('class_id')
      .populate('section_id')
      .populate('subject_id')
      .populate('student_id');
    if (!attendance) return res.status(404).json({ error: 'Exam attendance not found' });
    res.json(attendance);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update exam attendance
exports.updateExamAttendance = async (req, res) => {
  try {
    const attendance = await ExamAttendance.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!attendance) return res.status(404).json({ error: 'Exam attendance not found' });
    res.json(attendance);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete exam attendance
exports.deleteExamAttendance = async (req, res) => {
  try {
    const attendance = await ExamAttendance.findByIdAndDelete(req.params.id);
    if (!attendance) return res.status(404).json({ error: 'Exam attendance not found' });
    res.json({ message: 'Exam attendance deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
