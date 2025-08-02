const mongoose = require('mongoose');

const CustomFieldSchema = new mongoose.Schema({
  name: { type: String, required: true },
  belong_to: { type: String, required: true }, // e.g. student, staff, etc.
  type: { type: String, required: true }, // e.g. text, number, date
  options: [{ type: String }], // for select, radio, etc.
  default_value: { type: String },
  is_required: { type: Boolean, default: false },
  show_on_table: { type: Boolean, default: false },
  show_on_form: { type: Boolean, default: true },
  weight: { type: Number, default: 0 },
  status: { type: Boolean, default: true },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('CustomField', CustomFieldSchema);
