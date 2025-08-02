const mongoose = require('mongoose');

const EnquirySchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String },
  email: { type: String },
  address: { type: String },
  description: { type: String },
  enquiry_type: { type: String },
  source: { type: String },
  reference: { type: String },
  date: { type: Date, default: Date.now },
  status: { type: String, default: 'open' },
  assigned_to: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Enquiry', EnquirySchema);
