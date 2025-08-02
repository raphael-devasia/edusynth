const StaffLeaveDetail = require('../models/StaffLeaveDetail');
const Staff = require('../models/Staff');
const LeaveType = require('../models/LeaveType');

// Create a new staff leave detail
exports.createStaffLeaveDetail = async (req, res) => {
  try {
    const staffLeaveDetail = new StaffLeaveDetail(req.body);
    await staffLeaveDetail.save();
    res.status(201).json(staffLeaveDetail);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all staff leave details
exports.getAllStaffLeaveDetails = async (req, res) => {
  try {
    const staffLeaveDetails = await StaffLeaveDetail.find()
      .populate('staff_id', 'name surname employee_id')
      .populate('leave_type_id', 'type');
    res.json(staffLeaveDetails);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get a single staff leave detail by ID
exports.getStaffLeaveDetailById = async (req, res) => {
  try {
    const staffLeaveDetail = await StaffLeaveDetail.findById(req.params.id)
      .populate('staff_id', 'name surname employee_id')
      .populate('leave_type_id', 'type');
    if (!staffLeaveDetail) return res.status(404).json({ error: 'Staff leave detail not found' });
    res.json(staffLeaveDetail);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update a staff leave detail
exports.updateStaffLeaveDetail = async (req, res) => {
  try {
    const staffLeaveDetail = await StaffLeaveDetail.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!staffLeaveDetail) return res.status(404).json({ error: 'Staff leave detail not found' });
    res.json(staffLeaveDetail);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete a staff leave detail
exports.deleteStaffLeaveDetail = async (req, res) => {
  try {
    const staffLeaveDetail = await StaffLeaveDetail.findByIdAndDelete(req.params.id);
    if (!staffLeaveDetail) return res.status(404).json({ error: 'Staff leave detail not found' });
    res.json({ message: 'Staff leave detail deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
