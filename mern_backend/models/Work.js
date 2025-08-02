const mongoose = require('mongoose');

const WorkSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  assigned_to: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  due_date: { type: Date },
  status: { type: String, enum: ['pending', 'in_progress', 'completed'], default: 'pending' },
  priority: { type: String, enum: ['low', 'medium', 'high'], default: 'medium' },
  remarks: { type: String },
  is_active: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('Work', WorkSchema);
