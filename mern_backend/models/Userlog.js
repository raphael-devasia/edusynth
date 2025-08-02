const mongoose = require('mongoose');

const userlogSchema = new mongoose.Schema({
  user: {
    type: String,
    required: true
  },
  role: {
    type: String,
    required: true,
    enum: ['Admin', 'Teacher', 'Student', 'Parent', 'Accountant', 'Librarian', 'Receptionist']
  },
  class_section_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ClassSection',
    default: null
  },
  ipaddress: {
    type: String,
    required: true
  },
  login_datetime: {
    type: Date,
    default: Date.now
  },
  user_agent: {
    type: String,
    default: ''
  },
  session_id: {
    type: String,
    default: ''
  }
}, {
  timestamps: true
});

// Index for efficient queries
userlogSchema.index({ role: 1, login_datetime: -1 });
userlogSchema.index({ user: 1, login_datetime: -1 });
userlogSchema.index({ login_datetime: -1 });

module.exports = mongoose.model('Userlog', userlogSchema);
