const mongoose = require('mongoose');

const StaffContactSchema = new mongoose.Schema({
  staff_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Staff', required: true },
  contact_type: { type: String, required: true }, // e.g., phone, email, emergency
  value: { type: String, required: true },
  is_primary: { type: Boolean, default: false },
  remarks: { type: String },
  is_active: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('StaffContact', StaffContactSchema);
