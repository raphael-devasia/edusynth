const StaffLeave = require('../models/StaffLeave');
const Staff = require('../models/Staff');
const LeaveType = require('../models/LeaveType');

// Create a new staff leave
exports.createStaffLeave = async (req, res) => {
  try {
    const staffLeave = new StaffLeave(req.body);
    await staffLeave.save();
    res.status(201).json(staffLeave);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all staff leaves
exports.getAllStaffLeaves = async (req, res) => {
  try {
    const staffLeaves = await StaffLeave.find()
      .populate('staff_id', 'name surname employee_id')
      .populate('leave_type_id', 'type')
      .populate('applied_by', 'name');
    res.json(staffLeaves);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get a single staff leave by ID
exports.getStaffLeaveById = async (req, res) => {
  try {
    const staffLeave = await StaffLeave.findById(req.params.id)
      .populate('staff_id', 'name surname employee_id')
      .populate('leave_type_id', 'type')
      .populate('applied_by', 'name');
    if (!staffLeave) return res.status(404).json({ error: 'Staff leave not found' });
    res.json(staffLeave);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update a staff leave
exports.updateStaffLeave = async (req, res) => {
  try {
    const staffLeave = await StaffLeave.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!staffLeave) return res.status(404).json({ error: 'Staff leave not found' });
    res.json(staffLeave);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete a staff leave
exports.deleteStaffLeave = async (req, res) => {
  try {
    const staffLeave = await StaffLeave.findByIdAndDelete(req.params.id);
    if (!staffLeave) return res.status(404).json({ error: 'Staff leave not found' });
    res.json({ message: 'Staff leave deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
