const SubjectGroupSubject = require('../models/SubjectGroupSubject');
const SubjectGroup = require('../models/SubjectGroup');
const Session = require('../models/Session');
const Subject = require('../models/Subject');

// Create a new subject group subject
exports.createSubjectGroupSubject = async (req, res) => {
  try {
    const subjectGroupSubject = new SubjectGroupSubject(req.body);
    await subjectGroupSubject.save();
    res.status(201).json(subjectGroupSubject);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all subject group subjects
exports.getAllSubjectGroupSubjects = async (req, res) => {
  try {
    const subjectGroupSubjects = await SubjectGroupSubject.find()
      .populate('subject_group_id', 'name')
      .populate('session_id', 'session')
      .populate('subject_id', 'name code');
    res.json(subjectGroupSubjects);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get a single subject group subject by ID
exports.getSubjectGroupSubjectById = async (req, res) => {
  try {
    const subjectGroupSubject = await SubjectGroupSubject.findById(req.params.id)
      .populate('subject_group_id', 'name')
      .populate('session_id', 'session')
      .populate('subject_id', 'name code');
    if (!subjectGroupSubject) return res.status(404).json({ error: 'Subject group subject not found' });
    res.json(subjectGroupSubject);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update a subject group subject
exports.updateSubjectGroupSubject = async (req, res) => {
  try {
    const subjectGroupSubject = await SubjectGroupSubject.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!subjectGroupSubject) return res.status(404).json({ error: 'Subject group subject not found' });
    res.json(subjectGroupSubject);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete a subject group subject
exports.deleteSubjectGroupSubject = async (req, res) => {
  try {
    const subjectGroupSubject = await SubjectGroupSubject.findByIdAndDelete(req.params.id);
    if (!subjectGroupSubject) return res.status(404).json({ error: 'Subject group subject not found' });
    res.json({ message: 'Subject group subject deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
