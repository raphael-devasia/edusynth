const mongoose = require('mongoose');

const StudentHouseSchema = new mongoose.Schema({
  student_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
  house: { type: String, required: true },
  assigned_date: { type: Date },
  remarks: { type: String },
  is_active: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('StudentHouse', StudentHouseSchema);
