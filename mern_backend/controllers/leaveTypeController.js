const LeaveType = require('../models/LeaveType');

// Create a new LeaveType
exports.createLeaveType = async (req, res) => {
  try {
    const leaveType = new LeaveType(req.body);
    await leaveType.save();
    res.status(201).json(leaveType);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all LeaveTypes
exports.getAllLeaveTypes = async (req, res) => {
  try {
    const leaveTypes = await LeaveType.find();
    res.json(leaveTypes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get LeaveType by ID
exports.getLeaveTypeById = async (req, res) => {
  try {
    const leaveType = await LeaveType.findById(req.params.id);
    if (!leaveType) return res.status(404).json({ error: 'LeaveType not found' });
    res.json(leaveType);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update LeaveType
exports.updateLeaveType = async (req, res) => {
  try {
    const leaveType = await LeaveType.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!leaveType) return res.status(404).json({ error: 'LeaveType not found' });
    res.json(leaveType);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete LeaveType
exports.deleteLeaveType = async (req, res) => {
  try {
    const leaveType = await LeaveType.findByIdAndDelete(req.params.id);
    if (!leaveType) return res.status(404).json({ error: 'LeaveType not found' });
    res.json({ message: 'LeaveType deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
