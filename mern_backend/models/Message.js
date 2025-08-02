const mongoose = require('mongoose');

const AttachmentSchema = new mongoose.Schema({
  attachment: String,
  attachment_name: String,
  directory: String
}, { _id: false });

const MessageSchema = new mongoose.Schema({
  title: { type: String, required: true },
  message: { type: String, required: true },
  send_mail: { type: Boolean, default: false },
  send_sms: { type: Boolean, default: false },
  is_group: { type: Boolean, default: false },
  group_list: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  user_list: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  email_template_id: { type: mongoose.Schema.Types.ObjectId, ref: 'EmailTemplate', default: null },
  schedule_date_time: { type: Date, default: null },
  sent: { type: Boolean, default: false },
  attachments: [AttachmentSchema],
  created_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Message', MessageSchema);
