const mongoose = require('mongoose');

const ChatUserSchema = new mongoose.Schema({
  staff_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Staff' },
  student_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Student' },
  user_type: { type: String, enum: ['staff', 'student'], required: true },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('ChatUser', ChatUserSchema);
