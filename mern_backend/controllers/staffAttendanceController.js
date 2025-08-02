const StaffAttendance = require('../models/StaffAttendance');

// Create or update staff attendance (bulk)
exports.createOrUpdateStaffAttendance = async (req, res) => {
  try {
    const attendances = req.body;
    const results = [];
    for (const attendance of attendances) {
      let record = await StaffAttendance.findOne({ staff_id: attendance.staff_id, date: attendance.date });
      if (record) {
        record = await StaffAttendance.findByIdAndUpdate(record._id, attendance, { new: true });
      } else {
        record = new StaffAttendance(attendance);
        await record.save();
      }
      results.push(record);
    }
    res.status(200).json(results);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all staff attendance or by ID
exports.getStaffAttendances = async (req, res) => {
  try {
    const { id } = req.query;
    if (id) {
      const attendance = await StaffAttendance.findById(id).populate('staff_id');
      if (!attendance) return res.status(404).json({ error: 'StaffAttendance not found' });
      res.json(attendance);
    } else {
      const attendances = await StaffAttendance.find().populate('staff_id');
      res.json(attendances);
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update a staff attendance by ID
exports.updateStaffAttendance = async (req, res) => {
  try {
    const attendance = await StaffAttendance.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!attendance) return res.status(404).json({ error: 'StaffAttendance not found' });
    res.json(attendance);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete a staff attendance by ID
exports.deleteStaffAttendance = async (req, res) => {
  try {
    const attendance = await StaffAttendance.findByIdAndDelete(req.params.id);
    if (!attendance) return res.status(404).json({ error: 'StaffAttendance not found' });
    res.json({ message: 'StaffAttendance deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
