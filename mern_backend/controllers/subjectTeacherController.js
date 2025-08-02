const SubjectTeacher = require('../models/SubjectTeacher');

// Create a new SubjectTeacher
exports.createSubjectTeacher = async (req, res) => {
  try {
    const subjectTeacher = new SubjectTeacher(req.body);
    await subjectTeacher.save();
    res.status(201).json(subjectTeacher);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all SubjectTeachers
exports.getAllSubjectTeachers = async (req, res) => {
  try {
    const subjectTeachers = await SubjectTeacher.find()
      .populate('subject_id')
      .populate('class_id')
      .populate('section_id')
      .populate('teacher_id')
      .populate('session_id');
    res.json(subjectTeachers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get SubjectTeacher by ID
exports.getSubjectTeacherById = async (req, res) => {
  try {
    const subjectTeacher = await SubjectTeacher.findById(req.params.id)
      .populate('subject_id')
      .populate('class_id')
      .populate('section_id')
      .populate('teacher_id')
      .populate('session_id');
    if (!subjectTeacher) return res.status(404).json({ error: 'SubjectTeacher not found' });
    res.json(subjectTeacher);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update SubjectTeacher
exports.updateSubjectTeacher = async (req, res) => {
  try {
    const subjectTeacher = await SubjectTeacher.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!subjectTeacher) return res.status(404).json({ error: 'SubjectTeacher not found' });
    res.json(subjectTeacher);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete SubjectTeacher
exports.deleteSubjectTeacher = async (req, res) => {
  try {
    const subjectTeacher = await SubjectTeacher.findByIdAndDelete(req.params.id);
    if (!subjectTeacher) return res.status(404).json({ error: 'SubjectTeacher not found' });
    res.json({ message: 'SubjectTeacher deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
