const mongoose = require('mongoose');

const EmailTemplateAttachmentSchema = new mongoose.Schema({
  email_template_id: { type: mongoose.Schema.Types.ObjectId, ref: 'EmailTemplate', required: true },
  attachment: { type: String, required: true },
  attachment_name: { type: String, required: true }
});

module.exports = mongoose.model('EmailTemplateAttachment', EmailTemplateAttachmentSchema);
