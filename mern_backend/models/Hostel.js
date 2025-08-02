const mongoose = require('mongoose');

const HostelSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String },
  address: { type: String },
  intake: { type: Number },
  description: { type: String },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Hostel', HostelSchema);
