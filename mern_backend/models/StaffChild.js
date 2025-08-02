const mongoose = require('mongoose');

const StaffChildSchema = new mongoose.Schema({
  staff_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Staff', required: true },
  name: { type: String, required: true },
  gender: { type: String },
  dob: { type: Date },
  relation: { type: String },
  remarks: { type: String },
  is_active: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('StaffChild', StaffChildSchema);
