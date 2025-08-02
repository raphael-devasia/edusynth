const mongoose = require('mongoose');

const HostelDuesSchema = new mongoose.Schema({
  student_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
  hostel_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Hostel', required: true },
  due_date: { type: Date, required: true },
  amount: { type: Number, required: true },
  remarks: { type: String },
  is_active: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('HostelDues', HostelDuesSchema);
