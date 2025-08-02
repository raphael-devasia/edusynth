const SubjectSyllabus = require('../models/SubjectSyllabus');
const Topic = require('../models/Topic');
const Session = require('../models/Session');
const User = require('../models/User');

// Create a new subject syllabus
exports.createSubjectSyllabus = async (req, res) => {
  try {
    const subjectSyllabus = new SubjectSyllabus(req.body);
    await subjectSyllabus.save();
    res.status(201).json(subjectSyllabus);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all subject syllabi
exports.getAllSubjectSyllabi = async (req, res) => {
  try {
    const subjectSyllabi = await SubjectSyllabus.find()
      .populate('topic_id', 'name')
      .populate('session_id', 'session')
      .populate('created_by', 'name')
      .populate('created_for', 'name');
    res.json(subjectSyllabi);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get a single subject syllabus by ID
exports.getSubjectSyllabusById = async (req, res) => {
  try {
    const subjectSyllabus = await SubjectSyllabus.findById(req.params.id)
      .populate('topic_id', 'name')
      .populate('session_id', 'session')
      .populate('created_by', 'name')
      .populate('created_for', 'name');
    if (!subjectSyllabus) return res.status(404).json({ error: 'Subject syllabus not found' });
    res.json(subjectSyllabus);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update a subject syllabus
exports.updateSubjectSyllabus = async (req, res) => {
  try {
    const subjectSyllabus = await SubjectSyllabus.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!subjectSyllabus) return res.status(404).json({ error: 'Subject syllabus not found' });
    res.json(subjectSyllabus);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete a subject syllabus
exports.deleteSubjectSyllabus = async (req, res) => {
  try {
    const subjectSyllabus = await SubjectSyllabus.findByIdAndDelete(req.params.id);
    if (!subjectSyllabus) return res.status(404).json({ error: 'Subject syllabus not found' });
    res.json({ message: 'Subject syllabus deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
