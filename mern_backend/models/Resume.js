const mongoose = require('mongoose');

const ResumeSchema = new mongoose.Schema({
  staff_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Staff', required: true },
  file: { type: String, required: true },
  uploaded_at: { type: Date, default: Date.now }
}, { timestamps: true });

module.exports = mongoose.model('Resume', ResumeSchema);
