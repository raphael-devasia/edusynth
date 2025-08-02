const mongoose = require('mongoose');

const TeacherSchema = new mongoose.Schema({
  name: { type: String, required: true },
  gender: { type: String },
  dob: { type: Date },
  phone: { type: String },
  email: { type: String },
  address: { type: String },
  qualification: { type: String },
  experience: { type: String },
  joining_date: { type: Date },
  photo: { type: String },
  is_active: { type: Boolean, default: true },
  remarks: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Teacher', TeacherSchema);
