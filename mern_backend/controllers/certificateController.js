const Certificate = require('../models/Certificate');

// Create a new certificate
exports.createCertificate = async (req, res) => {
  try {
    const certificate = new Certificate(req.body);
    await certificate.save();
    res.status(201).json(certificate);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all certificates
exports.getCertificates = async (req, res) => {
  try {
    const certificates = await Certificate.find();
    res.json(certificates);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get a certificate by ID
exports.getCertificateById = async (req, res) => {
  try {
    const certificate = await Certificate.findById(req.params.id);
    if (!certificate) return res.status(404).json({ error: 'Certificate not found' });
    res.json(certificate);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update a certificate
exports.updateCertificate = async (req, res) => {
  try {
    const certificate = await Certificate.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!certificate) return res.status(404).json({ error: 'Certificate not found' });
    res.json(certificate);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete a certificate
exports.deleteCertificate = async (req, res) => {
  try {
    const certificate = await Certificate.findByIdAndDelete(req.params.id);
    if (!certificate) return res.status(404).json({ error: 'Certificate not found' });
    res.json({ message: 'Certificate deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
