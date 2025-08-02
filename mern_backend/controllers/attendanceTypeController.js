const AttendanceType = require('../models/AttendanceType');

// Create a new attendance type
exports.createAttendanceType = async (req, res) => {
  try {
    const attendanceType = new AttendanceType(req.body);
    await attendanceType.save();
    res.status(201).json(attendanceType);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all attendance types
exports.getAttendanceTypes = async (req, res) => {
  try {
    const attendanceTypes = await AttendanceType.find();
    res.json(attendanceTypes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get an attendance type by ID
exports.getAttendanceTypeById = async (req, res) => {
  try {
    const attendanceType = await AttendanceType.findById(req.params.id);
    if (!attendanceType) return res.status(404).json({ error: 'Attendance Type not found' });
    res.json(attendanceType);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update an attendance type
exports.updateAttendanceType = async (req, res) => {
  try {
    const attendanceType = await AttendanceType.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!attendanceType) return res.status(404).json({ error: 'Attendance Type not found' });
    res.json(attendanceType);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete an attendance type
exports.deleteAttendanceType = async (req, res) => {
  try {
    const attendanceType = await AttendanceType.findByIdAndDelete(req.params.id);
    if (!attendanceType) return res.status(404).json({ error: 'Attendance Type not found' });
    res.json({ message: 'Attendance Type deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
