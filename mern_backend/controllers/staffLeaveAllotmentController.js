const StaffLeaveAllotment = require('../models/StaffLeaveAllotment');
const Staff = require('../models/Staff');
const LeaveType = require('../models/LeaveType');

// Create a new staff leave allotment
exports.createAllotment = async (req, res) => {
  try {
    const { staff, leaveType, allotted, session, notes } = req.body;
    const allotment = new StaffLeaveAllotment({ staff, leaveType, allotted, session, notes });
    await allotment.save();
    res.status(201).json(allotment);
  } catch (err) {
    if (err.code === 11000) {
      return res.status(400).json({ error: 'Allotment already exists for this staff, leave type, and session.' });
    }
    res.status(400).json({ error: err.message });
  }
};

// Get all leave allotments, optionally filtered by staff or leaveType
exports.getAllotments = async (req, res) => {
  try {
    const filter = {};
    if (req.query.staff) filter.staff = req.query.staff;
    if (req.query.leaveType) filter.leaveType = req.query.leaveType;
    if (req.query.session) filter.session = req.query.session;
    const allotments = await StaffLeaveAllotment.find(filter)
      .populate('staff', 'name surname employee_id')
      .populate('leaveType', 'name')
      .populate('session', 'name');
    res.json(allotments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get a single allotment by ID
exports.getAllotmentById = async (req, res) => {
  try {
    const allotment = await StaffLeaveAllotment.findById(req.params.id)
      .populate('staff', 'name surname employee_id')
      .populate('leaveType', 'name')
      .populate('session', 'name');
    if (!allotment) return res.status(404).json({ error: 'Allotment not found' });
    res.json(allotment);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update an allotment
exports.updateAllotment = async (req, res) => {
  try {
    const { staff, leaveType, allotted, session, notes } = req.body;
    const allotment = await StaffLeaveAllotment.findByIdAndUpdate(
      req.params.id,
      { staff, leaveType, allotted, session, notes },
      { new: true, runValidators: true }
    );
    if (!allotment) return res.status(404).json({ error: 'Allotment not found' });
    res.json(allotment);
  } catch (err) {
    if (err.code === 11000) {
      return res.status(400).json({ error: 'Allotment already exists for this staff, leave type, and session.' });
    }
    res.status(400).json({ error: err.message });
  }
};

// Delete an allotment
exports.deleteAllotment = async (req, res) => {
  try {
    const result = await StaffLeaveAllotment.findByIdAndDelete(req.params.id);
    if (!result) return res.status(404).json({ error: 'Allotment not found' });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
