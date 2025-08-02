const StudentCertificate = require('../models/StudentCertificate');

// Create a new student certificate
exports.createStudentCertificate = async (req, res) => {
  try {
    const cert = new StudentCertificate(req.body);
    await cert.save();
    res.status(201).json(cert);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all student certificates
exports.getAllStudentCertificates = async (req, res) => {
  try {
    const certs = await StudentCertificate.find().populate('student_id', 'name');
    res.json(certs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get student certificate by ID
exports.getStudentCertificateById = async (req, res) => {
  try {
    const cert = await StudentCertificate.findById(req.params.id).populate('student_id', 'name');
    if (!cert) return res.status(404).json({ error: 'StudentCertificate not found' });
    res.json(cert);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update student certificate
exports.updateStudentCertificate = async (req, res) => {
  try {
    const cert = await StudentCertificate.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!cert) return res.status(404).json({ error: 'StudentCertificate not found' });
    res.json(cert);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete student certificate
exports.deleteStudentCertificate = async (req, res) => {
  try {
    const cert = await StudentCertificate.findByIdAndDelete(req.params.id);
    if (!cert) return res.status(404).json({ error: 'StudentCertificate not found' });
    res.json({ message: 'StudentCertificate deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
