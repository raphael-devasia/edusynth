const StaffCertificate = require('../models/StaffCertificate');

// Create a new staff certificate
exports.createStaffCertificate = async (req, res) => {
  try {
    const certificate = new StaffCertificate(req.body);
    await certificate.save();
    res.status(201).json(certificate);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all staff certificates
exports.getAllStaffCertificates = async (req, res) => {
  try {
    const certificates = await StaffCertificate.find().populate('staff_id', 'name');
    res.json(certificates);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get staff certificate by ID
exports.getStaffCertificateById = async (req, res) => {
  try {
    const certificate = await StaffCertificate.findById(req.params.id).populate('staff_id', 'name');
    if (!certificate) return res.status(404).json({ error: 'StaffCertificate not found' });
    res.json(certificate);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update staff certificate
exports.updateStaffCertificate = async (req, res) => {
  try {
    const certificate = await StaffCertificate.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!certificate) return res.status(404).json({ error: 'StaffCertificate not found' });
    res.json(certificate);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete staff certificate
exports.deleteStaffCertificate = async (req, res) => {
  try {
    const certificate = await StaffCertificate.findByIdAndDelete(req.params.id);
    if (!certificate) return res.status(404).json({ error: 'StaffCertificate not found' });
    res.json({ message: 'StaffCertificate deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
