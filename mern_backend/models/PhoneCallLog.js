const mongoose = require('mongoose');

const PhoneCallLogSchema = new mongoose.Schema({
  name: { type: String },
  contact: { type: String, required: true },
  date: { type: Date, required: true },
  description: { type: String },
  call_duration: { type: String },
  note: { type: String },
  call_type: { type: String, enum: ['Incoming', 'Outgoing'], required: true },
  follow_up_date: { type: Date },
}, { timestamps: true });

module.exports = mongoose.model('PhoneCallLog', PhoneCallLogSchema);
