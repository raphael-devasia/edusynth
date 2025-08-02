const mongoose = require('mongoose');

const StaffTimelineSchema = new mongoose.Schema({
  staff_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Staff', required: true },
  title: { type: String, required: true },
  description: { type: String },
  timeline_date: { type: Date, required: true },
  status: { type: String, enum: ['yes', 'no'], default: 'yes' },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('StaffTimeline', StaffTimelineSchema);
