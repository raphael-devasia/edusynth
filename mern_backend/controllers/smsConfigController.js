const SmsConfig = require('../models/SmsConfig');

// Create a new SMS config
exports.createSmsConfig = async (req, res) => {
  try {
    const smsConfig = new SmsConfig(req.body);
    await smsConfig.save();
    res.status(201).json(smsConfig);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all SMS configs
exports.getAllSmsConfigs = async (req, res) => {
  try {
    const smsConfigs = await SmsConfig.find();
    res.json(smsConfigs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get an SMS config by ID
exports.getSmsConfigById = async (req, res) => {
  try {
    const smsConfig = await SmsConfig.findById(req.params.id);
    if (!smsConfig) return res.status(404).json({ error: 'SmsConfig not found' });
    res.json(smsConfig);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update an SMS config
exports.updateSmsConfig = async (req, res) => {
  try {
    const smsConfig = await SmsConfig.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!smsConfig) return res.status(404).json({ error: 'SmsConfig not found' });
    res.json(smsConfig);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete an SMS config
exports.deleteSmsConfig = async (req, res) => {
  try {
    const smsConfig = await SmsConfig.findByIdAndDelete(req.params.id);
    if (!smsConfig) return res.status(404).json({ error: 'SmsConfig not found' });
    res.json({ message: 'SmsConfig deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
