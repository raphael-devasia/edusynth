const Subject = require('../models/Subject');

// Create a new subject
exports.createSubject = async (req, res) => {
  try {
    const subject = new Subject(req.body);
    await subject.save();
    res.status(201).json(subject);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all subjects or by ID
exports.getSubjects = async (req, res) => {
  try {
    const { id } = req.query;
    if (id) {
      const subject = await Subject.findById(id).populate('class_id');
      if (!subject) return res.status(404).json({ error: 'Subject not found' });
      res.json(subject);
    } else {
      const subjects = await Subject.find().populate('class_id');
      res.json(subjects);
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update a subject
exports.updateSubject = async (req, res) => {
  try {
    const subject = await Subject.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!subject) return res.status(404).json({ error: 'Subject not found' });
    res.json(subject);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete a subject
exports.deleteSubject = async (req, res) => {
  try {
    const subject = await Subject.findByIdAndDelete(req.params.id);
    if (!subject) return res.status(404).json({ error: 'Subject not found' });
    res.json({ message: 'Subject deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
