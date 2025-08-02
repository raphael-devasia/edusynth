const mongoose = require('mongoose');

const StaffExperienceSchema = new mongoose.Schema({
  staff_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Staff', required: true },
  organization: { type: String, required: true },
  designation: { type: String },
  from_date: { type: Date },
  to_date: { type: Date },
  remarks: { type: String },
  is_active: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('StaffExperience', StaffExperienceSchema);
