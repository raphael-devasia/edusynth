const mongoose = require('mongoose');

const DispatchSchema = new mongoose.Schema({
  reference_no: { type: String, required: true },
  to_title: { type: String, required: true },
  address: { type: String, required: true },
  note: { type: String },
  from_title: { type: String, required: true },
  date: { type: Date, required: true },
  type: { type: String, enum: ['dispatch', 'receive'], required: true },
  image: { type: String },
  created_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Dispatch', DispatchSchema);
