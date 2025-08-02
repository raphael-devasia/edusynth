const mongoose = require('mongoose');

const EnquiryFollowupSchema = new mongoose.Schema({
  enquiry_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Enquiry', required: true },
  followup_date: { type: Date, required: true },
  next_followup_date: { type: Date },
  response: { type: String },
  remarks: { type: String },
  is_active: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('EnquiryFollowup', EnquiryFollowupSchema);
