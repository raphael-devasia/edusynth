const mongoose = require('mongoose');

const DepartmentSchema = new mongoose.Schema({
  department_name: { type: String, required: true, unique: true },
  description: { type: String },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Department', DepartmentSchema);
