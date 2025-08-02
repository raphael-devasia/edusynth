const ExamGroup = require('../models/ExamGroup');

// Create a new exam group
exports.createExamGroup = async (req, res) => {
  try {
    const examGroup = new ExamGroup(req.body);
    await examGroup.save();
    res.status(201).json(examGroup);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all exam groups or by ID
exports.getExamGroups = async (req, res) => {
  try {
    const { id } = req.query;
    if (id) {
      const examGroup = await ExamGroup.findById(id);
      if (!examGroup) return res.status(404).json({ error: 'ExamGroup not found' });
      res.json(examGroup);
    } else {
      const examGroups = await ExamGroup.find().sort({ _id: 1 });
      res.json(examGroups);
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update an exam group
exports.updateExamGroup = async (req, res) => {
  try {
    const examGroup = await ExamGroup.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!examGroup) return res.status(404).json({ error: 'ExamGroup not found' });
    res.json(examGroup);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete an exam group
exports.deleteExamGroup = async (req, res) => {
  try {
    const examGroup = await ExamGroup.findByIdAndDelete(req.params.id);
    if (!examGroup) return res.status(404).json({ error: 'ExamGroup not found' });
    res.json({ message: 'ExamGroup deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
