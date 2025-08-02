const SmsTemplate = require('../models/SmsTemplate');

// Create a new SMS template
exports.createSmsTemplate = async (req, res) => {
  try {
    const smsTemplate = new SmsTemplate(req.body);
    await smsTemplate.save();
    res.status(201).json(smsTemplate);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all SMS templates
exports.getSmsTemplates = async (req, res) => {
  try {
    const smsTemplates = await SmsTemplate.find();
    res.json(smsTemplates);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get a single SMS template by ID
exports.getSmsTemplateById = async (req, res) => {
  try {
    const smsTemplate = await SmsTemplate.findById(req.params.id);
    if (!smsTemplate) return res.status(404).json({ error: 'SMS template not found' });
    res.json(smsTemplate);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update an SMS template
exports.updateSmsTemplate = async (req, res) => {
  try {
    const smsTemplate = await SmsTemplate.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!smsTemplate) return res.status(404).json({ error: 'SMS template not found' });
    res.json(smsTemplate);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete an SMS template
exports.deleteSmsTemplate = async (req, res) => {
  try {
    const smsTemplate = await SmsTemplate.findByIdAndDelete(req.params.id);
    if (!smsTemplate) return res.status(404).json({ error: 'SMS template not found' });
    res.json({ message: 'SMS template deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
