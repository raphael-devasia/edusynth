const StaffUpload = require('../models/StaffUpload');

// Create a new staff upload
exports.createStaffUpload = async (req, res) => {
  try {
    const upload = new StaffUpload(req.body);
    await upload.save();
    res.status(201).json(upload);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all staff uploads
exports.getAllStaffUploads = async (req, res) => {
  try {
    const uploads = await StaffUpload.find().populate('staff_id', 'name');
    res.json(uploads);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get staff upload by ID
exports.getStaffUploadById = async (req, res) => {
  try {
    const upload = await StaffUpload.findById(req.params.id).populate('staff_id', 'name');
    if (!upload) return res.status(404).json({ error: 'StaffUpload not found' });
    res.json(upload);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update staff upload
exports.updateStaffUpload = async (req, res) => {
  try {
    const upload = await StaffUpload.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!upload) return res.status(404).json({ error: 'StaffUpload not found' });
    res.json(upload);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete staff upload
exports.deleteStaffUpload = async (req, res) => {
  try {
    const upload = await StaffUpload.findByIdAndDelete(req.params.id);
    if (!upload) return res.status(404).json({ error: 'StaffUpload not found' });
    res.json({ message: 'StaffUpload deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
