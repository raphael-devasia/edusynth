const SubjectTimetable = require('../models/SubjectTimetable');

// Create a new subject timetable entry
exports.createSubjectTimetable = async (req, res) => {
  try {
    const subjectTimetable = new SubjectTimetable(req.body);
    await subjectTimetable.save();
    res.status(201).json(subjectTimetable);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all subject timetables or by ID
exports.getSubjectTimetables = async (req, res) => {
  try {
    const { id } = req.query;
    if (id) {
      const subjectTimetable = await SubjectTimetable.findById(id);
      if (!subjectTimetable) return res.status(404).json({ error: 'SubjectTimetable not found' });
      res.json(subjectTimetable);
    } else {
      const subjectTimetables = await SubjectTimetable.find();
      res.json(subjectTimetables);
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update a subject timetable
exports.updateSubjectTimetable = async (req, res) => {
  try {
    const subjectTimetable = await SubjectTimetable.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!subjectTimetable) return res.status(404).json({ error: 'SubjectTimetable not found' });
    res.json(subjectTimetable);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete a subject timetable
exports.deleteSubjectTimetable = async (req, res) => {
  try {
    const subjectTimetable = await SubjectTimetable.findByIdAndDelete(req.params.id);
    if (!subjectTimetable) return res.status(404).json({ error: 'SubjectTimetable not found' });
    res.json({ message: 'SubjectTimetable deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
