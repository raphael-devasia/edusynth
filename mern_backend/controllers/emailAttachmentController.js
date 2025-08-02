const EmailAttachment = require('../models/EmailAttachment');

// Create a new email attachment
exports.createEmailAttachment = async (req, res) => {
  try {
    const emailAttachment = new EmailAttachment(req.body);
    await emailAttachment.save();
    res.status(201).json(emailAttachment);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all email attachments (optionally filter by message_id)
exports.getEmailAttachments = async (req, res) => {
  try {
    const { message_id } = req.query;
    let query = {};
    if (message_id) query.message_id = message_id;
    const attachments = await EmailAttachment.find(query).populate('message_id');
    res.json(attachments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get a single email attachment by ID
exports.getEmailAttachmentById = async (req, res) => {
  try {
    const attachment = await EmailAttachment.findById(req.params.id).populate('message_id');
    if (!attachment) return res.status(404).json({ error: 'Email attachment not found' });
    res.json(attachment);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update an email attachment
exports.updateEmailAttachment = async (req, res) => {
  try {
    const attachment = await EmailAttachment.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!attachment) return res.status(404).json({ error: 'Email attachment not found' });
    res.json(attachment);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete an email attachment
exports.deleteEmailAttachment = async (req, res) => {
  try {
    const attachment = await EmailAttachment.findByIdAndDelete(req.params.id);
    if (!attachment) return res.status(404).json({ error: 'Email attachment not found' });
    res.json({ message: 'Email attachment deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
