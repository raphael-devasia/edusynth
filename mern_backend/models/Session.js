const mongoose = require('mongoose');

const SessionSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  start_date: { type: Date },
  end_date: { type: Date },
  is_active: { type: Boolean, default: false },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Session', SessionSchema);
