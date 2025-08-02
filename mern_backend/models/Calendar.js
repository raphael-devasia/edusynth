const mongoose = require('mongoose');

const CalendarSchema = new mongoose.Schema({
  event_title: { type: String, required: true },
  event_type: { type: String, required: true },
  start_date: { type: Date, required: true },
  end_date: { type: Date, required: true },
  event_description: { type: String },
  event_color: { type: String },
  event_for: { type: Number },
  role_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Role' },
  is_default: { type: Boolean },
  holiday_type: { type: String },
  front_site: { type: Boolean },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Calendar', CalendarSchema);
