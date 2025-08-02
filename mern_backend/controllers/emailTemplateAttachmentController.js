const EmailTemplateAttachment = require('../models/EmailTemplateAttachment');

// Create a new email template attachment
exports.createEmailTemplateAttachment = async (req, res) => {
  try {
    const attachment = new EmailTemplateAttachment(req.body);
    await attachment.save();
    res.status(201).json(attachment);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all email template attachments (optionally filter by email_template_id)
exports.getEmailTemplateAttachments = async (req, res) => {
  try {
    const { email_template_id } = req.query;
    let query = {};
    if (email_template_id) query.email_template_id = email_template_id;
    const attachments = await EmailTemplateAttachment.find(query).populate('email_template_id');
    res.json(attachments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get a single email template attachment by ID
exports.getEmailTemplateAttachmentById = async (req, res) => {
  try {
    const attachment = await EmailTemplateAttachment.findById(req.params.id).populate('email_template_id');
    if (!attachment) return res.status(404).json({ error: 'Email template attachment not found' });
    res.json(attachment);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update an email template attachment
exports.updateEmailTemplateAttachment = async (req, res) => {
  try {
    const attachment = await EmailTemplateAttachment.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!attachment) return res.status(404).json({ error: 'Email template attachment not found' });
    res.json(attachment);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete an email template attachment
exports.deleteEmailTemplateAttachment = async (req, res) => {
  try {
    const attachment = await EmailTemplateAttachment.findByIdAndDelete(req.params.id);
    if (!attachment) return res.status(404).json({ error: 'Email template attachment not found' });
    res.json({ message: 'Email template attachment deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
