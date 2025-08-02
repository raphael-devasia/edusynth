const PhoneCallLog = require('../models/PhoneCallLog');

// Get all phone call logs
exports.getAll = async (req, res) => {
  try {
    const logs = await PhoneCallLog.find().sort({ date: -1 });
    res.json(logs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get a phone call log by ID
exports.getById = async (req, res) => {
  try {
    const log = await PhoneCallLog.findById(req.params.id);
    if (!log) return res.status(404).json({ error: 'Not found' });
    res.json(log);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Create a new phone call log
exports.create = async (req, res) => {
  try {
    const log = new PhoneCallLog(req.body);
    await log.save();
    res.status(201).json(log);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Update a phone call log
exports.update = async (req, res) => {
  try {
    const log = await PhoneCallLog.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!log) return res.status(404).json({ error: 'Not found' });
    res.json(log);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete a phone call log
exports.remove = async (req, res) => {
  try {
    const log = await PhoneCallLog.findByIdAndDelete(req.params.id);
    if (!log) return res.status(404).json({ error: 'Not found' });
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
