const mongoose = require('mongoose');

const PromotionSchema = new mongoose.Schema({
  student_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
  from_class_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Class', required: true },
  from_section_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Section', required: true },
  to_class_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Class', required: true },
  to_section_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Section', required: true },
  session_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Session', required: true },
  promoted_on: { type: Date, default: Date.now },
  remarks: { type: String },
  is_active: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('Promotion', PromotionSchema);
