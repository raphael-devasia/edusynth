const SubjectAttendance = require('../models/SubjectAttendance');

// Create a new SubjectAttendance
exports.createSubjectAttendance = async (req, res) => {
  try {
    const subjectAttendance = new SubjectAttendance(req.body);
    await subjectAttendance.save();
    res.status(201).json(subjectAttendance);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all SubjectAttendances
exports.getAllSubjectAttendances = async (req, res) => {
  try {
    const subjectAttendances = await SubjectAttendance.find()
      .populate('student_id')
      .populate('subject_id')
      .populate('class_id')
      .populate('section_id')
      .populate('session_id');
    res.json(subjectAttendances);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get SubjectAttendance by ID
exports.getSubjectAttendanceById = async (req, res) => {
  try {
    const subjectAttendance = await SubjectAttendance.findById(req.params.id)
      .populate('student_id')
      .populate('subject_id')
      .populate('class_id')
      .populate('section_id')
      .populate('session_id');
    if (!subjectAttendance) return res.status(404).json({ error: 'SubjectAttendance not found' });
    res.json(subjectAttendance);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update SubjectAttendance
exports.updateSubjectAttendance = async (req, res) => {
  try {
    const subjectAttendance = await SubjectAttendance.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!subjectAttendance) return res.status(404).json({ error: 'SubjectAttendance not found' });
    res.json(subjectAttendance);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete SubjectAttendance
exports.deleteSubjectAttendance = async (req, res) => {
  try {
    const subjectAttendance = await SubjectAttendance.findByIdAndDelete(req.params.id);
    if (!subjectAttendance) return res.status(404).json({ error: 'SubjectAttendance not found' });
    res.json({ message: 'SubjectAttendance deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
