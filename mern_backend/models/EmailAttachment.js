const mongoose = require('mongoose');

const EmailAttachmentSchema = new mongoose.Schema({
  message_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Message', required: true },
  directory: { type: String, required: true },
  attachment: { type: String, required: true },
  attachment_name: { type: String, required: true },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('EmailAttachment', EmailAttachmentSchema);
