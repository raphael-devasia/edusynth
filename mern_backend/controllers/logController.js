const Log = require('../models/Log');

// Create a new Log
exports.createLog = async (req, res) => {
  try {
    const log = new Log(req.body);
    await log.save();
    res.status(201).json(log);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all Logs
exports.getAllLogs = async (req, res) => {
  try {
    const logs = await Log.find().populate('user_id');
    res.json(logs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get Log by ID
exports.getLogById = async (req, res) => {
  try {
    const log = await Log.findById(req.params.id).populate('user_id');
    if (!log) return res.status(404).json({ error: 'Log not found' });
    res.json(log);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update Log
exports.updateLog = async (req, res) => {
  try {
    const log = await Log.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!log) return res.status(404).json({ error: 'Log not found' });
    res.json(log);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete Log
exports.deleteLog = async (req, res) => {
  try {
    const log = await Log.findByIdAndDelete(req.params.id);
    if (!log) return res.status(404).json({ error: 'Log not found' });
    res.json({ message: 'Log deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
