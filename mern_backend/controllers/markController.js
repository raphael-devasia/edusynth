const Mark = require('../models/Mark');

// Create a new mark
exports.createMark = async (req, res) => {
  try {
    const mark = new Mark(req.body);
    await mark.save();
    res.status(201).json(mark);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all marks or by ID
exports.getMarks = async (req, res) => {
  try {
    const { id } = req.query;
    if (id) {
      const mark = await Mark.findById(id)
        .populate('student_id')
        .populate('exam_id')
        .populate('subject_id');
      if (!mark) return res.status(404).json({ error: 'Mark not found' });
      res.json(mark);
    } else {
      const marks = await Mark.find()
        .populate('student_id')
        .populate('exam_id')
        .populate('subject_id');
      res.json(marks);
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update a mark
exports.updateMark = async (req, res) => {
  try {
    const mark = await Mark.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!mark) return res.status(404).json({ error: 'Mark not found' });
    res.json(mark);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete a mark
exports.deleteMark = async (req, res) => {
  try {
    const mark = await Mark.findByIdAndDelete(req.params.id);
    if (!mark) return res.status(404).json({ error: 'Mark not found' });
    res.json({ message: 'Mark deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
