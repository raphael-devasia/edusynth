const mongoose = require('mongoose');

const ComplaintSchema = new mongoose.Schema({
  complain_type_id: { type: mongoose.Schema.Types.ObjectId, ref: 'ComplaintType', required: true },
  complain_by: { type: String, required: true }, // Name or reference
  phone: { type: String },
  date: { type: Date, required: true },
  description: { type: String },
  action_taken: { type: String },
  assigned: { type: String },
  note: { type: String },
  image: { type: String },
  document: { type: String },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Complaint', ComplaintSchema);
