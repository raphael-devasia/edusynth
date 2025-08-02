const EmailTemplate = require('../models/EmailTemplate');

// Create a new email template
exports.createEmailTemplate = async (req, res) => {
  try {
    const emailTemplate = new EmailTemplate(req.body);
    await emailTemplate.save();
    res.status(201).json(emailTemplate);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all email templates
exports.getEmailTemplates = async (req, res) => {
  try {
    const templates = await EmailTemplate.find();
    res.json(templates);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get a single email template by ID
exports.getEmailTemplateById = async (req, res) => {
  try {
    const template = await EmailTemplate.findById(req.params.id);
    if (!template) return res.status(404).json({ error: 'Email template not found' });
    res.json(template);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update an email template
exports.updateEmailTemplate = async (req, res) => {
  try {
    const template = await EmailTemplate.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!template) return res.status(404).json({ error: 'Email template not found' });
    res.json(template);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete an email template
exports.deleteEmailTemplate = async (req, res) => {
  try {
    const template = await EmailTemplate.findByIdAndDelete(req.params.id);
    if (!template) return res.status(404).json({ error: 'Email template not found' });
    res.json({ message: 'Email template deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
