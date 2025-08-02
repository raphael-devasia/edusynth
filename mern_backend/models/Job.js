const mongoose = require('mongoose');

const JobSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  department: { type: String },
  posted_date: { type: Date, default: Date.now },
  closing_date: { type: Date },
  is_active: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('Job', JobSchema);
