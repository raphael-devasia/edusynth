const StaffBankDetails = require('../models/StaffBankDetails');

// Create a new staff bank details
exports.createStaffBankDetails = async (req, res) => {
  try {
    const details = new StaffBankDetails(req.body);
    await details.save();
    res.status(201).json(details);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all staff bank details
exports.getAllStaffBankDetails = async (req, res) => {
  try {
    const details = await StaffBankDetails.find().populate('staff_id', 'name');
    res.json(details);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get staff bank details by ID
exports.getStaffBankDetailsById = async (req, res) => {
  try {
    const details = await StaffBankDetails.findById(req.params.id).populate('staff_id', 'name');
    if (!details) return res.status(404).json({ error: 'StaffBankDetails not found' });
    res.json(details);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update staff bank details
exports.updateStaffBankDetails = async (req, res) => {
  try {
    const details = await StaffBankDetails.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!details) return res.status(404).json({ error: 'StaffBankDetails not found' });
    res.json(details);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete staff bank details
exports.deleteStaffBankDetails = async (req, res) => {
  try {
    const details = await StaffBankDetails.findByIdAndDelete(req.params.id);
    if (!details) return res.status(404).json({ error: 'StaffBankDetails not found' });
    res.json({ message: 'StaffBankDetails deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
