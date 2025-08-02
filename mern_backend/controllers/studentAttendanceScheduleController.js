const StudentAttendanceSchedule = require('../models/StudentAttendanceSchedule');

// Create a new student attendance schedule
exports.createStudentAttendanceSchedule = async (req, res) => {
  try {
    const studentAttendanceSchedule = new StudentAttendanceSchedule(req.body);
    await studentAttendanceSchedule.save();
    res.status(201).json(studentAttendanceSchedule);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all student attendance schedules or by ID
exports.getStudentAttendanceSchedules = async (req, res) => {
  try {
    const { id } = req.query;
    if (id) {
      const studentAttendanceSchedule = await StudentAttendanceSchedule.findById(id)
        .populate('class_section_id')
        .populate('attendence_type_id');
      if (!studentAttendanceSchedule) return res.status(404).json({ error: 'Student attendance schedule not found' });
      res.json(studentAttendanceSchedule);
    } else {
      const studentAttendanceSchedules = await StudentAttendanceSchedule.find()
        .populate('class_section_id')
        .populate('attendence_type_id');
      res.json(studentAttendanceSchedules);
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update a student attendance schedule
exports.updateStudentAttendanceSchedule = async (req, res) => {
  try {
    const studentAttendanceSchedule = await StudentAttendanceSchedule.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!studentAttendanceSchedule) return res.status(404).json({ error: 'Student attendance schedule not found' });
    res.json(studentAttendanceSchedule);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete a student attendance schedule
exports.deleteStudentAttendanceSchedule = async (req, res) => {
  try {
    const studentAttendanceSchedule = await StudentAttendanceSchedule.findByIdAndDelete(req.params.id);
    if (!studentAttendanceSchedule) return res.status(404).json({ error: 'Student attendance schedule not found' });
    res.json({ message: 'Student attendance schedule deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
