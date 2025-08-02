const SubjectGroup = require('../models/SubjectGroup');

// Create a new subject group
exports.createSubjectGroup = async (req, res) => {
  try {
    const subjectGroup = new SubjectGroup(req.body);
    await subjectGroup.save();
    res.status(201).json(subjectGroup);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all subject groups or by ID
exports.getSubjectGroups = async (req, res) => {
  try {
    const { id } = req.query;
    if (id) {
      const subjectGroup = await SubjectGroup.findById(id)
        .populate('class_id section_ids session_id');
      if (!subjectGroup) return res.status(404).json({ error: 'SubjectGroup not found' });
      res.json(subjectGroup);
    } else {
      const subjectGroups = await SubjectGroup.find()
        .populate('class_id section_ids session_id');
      res.json(subjectGroups);
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update a subject group
exports.updateSubjectGroup = async (req, res) => {
  try {
    const subjectGroup = await SubjectGroup.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!subjectGroup) return res.status(404).json({ error: 'SubjectGroup not found' });
    res.json(subjectGroup);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete a subject group
exports.deleteSubjectGroup = async (req, res) => {
  try {
    const subjectGroup = await SubjectGroup.findByIdAndDelete(req.params.id);
    if (!subjectGroup) return res.status(404).json({ error: 'SubjectGroup not found' });
    res.json({ message: 'SubjectGroup deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
