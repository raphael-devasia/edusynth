const mongoose = require('mongoose');

const AdmissionEnquirySchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String },
  address: { type: String },
  class: { type: String },
  number_of_child: { type: Number },
  source: { type: String },
  reference: { type: String },
  assigned: { type: String }, // or mongoose.Schema.Types.ObjectId if referencing a User/Staff
  next_follow_up_date: { type: Date },
  description: { type: String },
  date: { type: Date, default: Date.now },
  status: { type: String, default: 'pending' }, // e.g., pending, contacted, admitted, rejected
  note: { type: String },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('AdmissionEnquiry', AdmissionEnquirySchema);
