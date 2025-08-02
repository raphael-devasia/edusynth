const ExamSchedule = require('../models/ExamSchedule');

// Create a new exam schedule
exports.createExamSchedule = async (req, res) => {
  try {
    const examSchedule = new ExamSchedule(req.body);
    await examSchedule.save();
    res.status(201).json(examSchedule);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all exam schedules or by filter
exports.getExamSchedules = async (req, res) => {
  try {
    const filter = req.query || {};
    const examSchedules = await ExamSchedule.find(filter)
      .populate('exam_id teacher_subject_id session_id');
    res.json(examSchedules);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update an exam schedule
exports.updateExamSchedule = async (req, res) => {
  try {
    const examSchedule = await ExamSchedule.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!examSchedule) return res.status(404).json({ error: 'ExamSchedule not found' });
    res.json(examSchedule);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete an exam schedule
exports.deleteExamSchedule = async (req, res) => {
  try {
    const examSchedule = await ExamSchedule.findByIdAndDelete(req.params.id);
    if (!examSchedule) return res.status(404).json({ error: 'ExamSchedule not found' });
    res.json({ message: 'ExamSchedule deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
