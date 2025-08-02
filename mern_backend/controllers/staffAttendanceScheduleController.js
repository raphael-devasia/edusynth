const StaffAttendanceSchedule = require('../models/StaffAttendanceSchedule');

// Create a new staff attendance schedule
exports.createStaffAttendanceSchedule = async (req, res) => {
  try {
    const staffAttendanceSchedule = new StaffAttendanceSchedule(req.body);
    await staffAttendanceSchedule.save();
    res.status(201).json(staffAttendanceSchedule);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all staff attendance schedules or by ID
exports.getStaffAttendanceSchedules = async (req, res) => {
  try {
    const { id } = req.query;
    if (id) {
      const staffAttendanceSchedule = await StaffAttendanceSchedule.findById(id)
        .populate('role_id')
        .populate('staff_attendance_type_id');
      if (!staffAttendanceSchedule) return res.status(404).json({ error: 'Staff attendance schedule not found' });
      res.json(staffAttendanceSchedule);
    } else {
      const staffAttendanceSchedules = await StaffAttendanceSchedule.find()
        .populate('role_id')
        .populate('staff_attendance_type_id');
      res.json(staffAttendanceSchedules);
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update a staff attendance schedule
exports.updateStaffAttendanceSchedule = async (req, res) => {
  try {
    const staffAttendanceSchedule = await StaffAttendanceSchedule.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!staffAttendanceSchedule) return res.status(404).json({ error: 'Staff attendance schedule not found' });
    res.json(staffAttendanceSchedule);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete a staff attendance schedule
exports.deleteStaffAttendanceSchedule = async (req, res) => {
  try {
    const staffAttendanceSchedule = await StaffAttendanceSchedule.findByIdAndDelete(req.params.id);
    if (!staffAttendanceSchedule) return res.status(404).json({ error: 'Staff attendance schedule not found' });
    res.json({ message: 'Staff attendance schedule deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
