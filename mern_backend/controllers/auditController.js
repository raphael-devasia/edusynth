const Audit = require('../models/Audit');

// Create a new audit log
exports.createAudit = async (req, res) => {
  try {
    const audit = new Audit(req.body);
    await audit.save();
    res.status(201).json(audit);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all audit logs
exports.getAudits = async (req, res) => {
  try {
    const audits = await Audit.find().populate('user_id');
    res.json(audits);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get an audit log by ID
exports.getAuditById = async (req, res) => {
  try {
    const audit = await Audit.findById(req.params.id).populate('user_id');
    if (!audit) return res.status(404).json({ error: 'Audit not found' });
    res.json(audit);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update an audit log
exports.updateAudit = async (req, res) => {
  try {
    const audit = await Audit.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!audit) return res.status(404).json({ error: 'Audit not found' });
    res.json(audit);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete an audit log
exports.deleteAudit = async (req, res) => {
  try {
    const audit = await Audit.findByIdAndDelete(req.params.id);
    if (!audit) return res.status(404).json({ error: 'Audit not found' });
    res.json({ message: 'Audit deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
