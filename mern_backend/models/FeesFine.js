const mongoose = require('mongoose');

const FeesFineSchema = new mongoose.Schema({
  student_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
  fees_type_id: { type: mongoose.Schema.Types.ObjectId, ref: 'FeeType', required: true },
  amount: { type: Number, required: true },
  fine_date: { type: Date, required: true },
  remarks: { type: String },
  is_active: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('FeesFine', FeesFineSchema);
