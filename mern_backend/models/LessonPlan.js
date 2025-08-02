const mongoose = require('mongoose');

const LessonPlanSchema = new mongoose.Schema({
  lesson_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Lesson', required: true },
  teacher_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Staff', required: true },
  date: { type: Date, required: true },
  objectives: { type: String },
  activities: { type: String },
  resources: { type: String },
  assessment: { type: String },
  remarks: { type: String },
  is_active: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('LessonPlan', LessonPlanSchema);
