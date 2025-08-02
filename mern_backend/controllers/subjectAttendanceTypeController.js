const SubjectAttendanceType = require('../models/SubjectAttendanceType');

// Create a new SubjectAttendanceType
exports.createSubjectAttendanceType = async (req, res) => {
  try {
    const subjectAttendanceType = new SubjectAttendanceType(req.body);
    await subjectAttendanceType.save();
    res.status(201).json(subjectAttendanceType);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all SubjectAttendanceTypes
exports.getAllSubjectAttendanceTypes = async (req, res) => {
  try {
    const types = await SubjectAttendanceType.find();
    res.json(types);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get SubjectAttendanceType by ID
exports.getSubjectAttendanceTypeById = async (req, res) => {
  try {
    const type = await SubjectAttendanceType.findById(req.params.id);
    if (!type) return res.status(404).json({ error: 'SubjectAttendanceType not found' });
    res.json(type);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update SubjectAttendanceType
exports.updateSubjectAttendanceType = async (req, res) => {
  try {
    const type = await SubjectAttendanceType.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!type) return res.status(404).json({ error: 'SubjectAttendanceType not found' });
    res.json(type);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete SubjectAttendanceType
exports.deleteSubjectAttendanceType = async (req, res) => {
  try {
    const type = await SubjectAttendanceType.findByIdAndDelete(req.params.id);
    if (!type) return res.status(404).json({ error: 'SubjectAttendanceType not found' });
    res.json({ message: 'SubjectAttendanceType deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
