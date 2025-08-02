const mongoose = require('mongoose');

const ChatSchema = new mongoose.Schema({
  sender_id: { type: mongoose.Schema.Types.ObjectId, required: true },
  receiver_id: { type: mongoose.Schema.Types.ObjectId, required: true },
  sender_type: { type: String, required: true },
  receiver_type: { type: String, required: true },
  message: { type: String, required: true },
  seen: { type: Boolean, default: false },
  sent_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Chat', ChatSchema);
