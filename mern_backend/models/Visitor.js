const mongoose = require('mongoose');

const VisitorSchema = new mongoose.Schema({
  staff_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Staff', default: null },
  student_session_id: { type: mongoose.Schema.Types.ObjectId, ref: 'StudentSession', default: null },
  source: { type: String },
  purpose: { type: String, required: true },
  name: { type: String, required: true },
  email: { type: String },
  contact: { type: String, required: true },
  id_proof: { type: String },
  no_of_people: { type: Number, required: true },
  date: { type: Date, required: true },
  in_time: { type: String, required: true },
  out_time: { type: String },
  note: { type: String },
  image: { type: String },
  meeting_with: { type: String },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});

VisitorSchema.pre('save', function(next) {
  this.updated_at = Date.now();
  next();
});

module.exports = mongoose.model('Visitor', VisitorSchema);
