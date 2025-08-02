const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  childs: { type: String }, // text field, could be JSON or CSV
  role: { type: String, required: true },
  lang_id: { type: Number },
  currency_id: { type: Number, default: 0 },
  verification_code: { type: String },
  is_active: { type: String, default: 'yes' },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', UserSchema);
