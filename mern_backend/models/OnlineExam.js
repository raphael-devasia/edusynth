const mongoose = require('mongoose');

const onlineExamSchema = new mongoose.Schema({
  exam: {
    type: String,
    required: true
  },
  description: {
    type: String,
    default: ''
  },
  exam_from: {
    type: Date,
    required: true
  },
  exam_to: {
    type: Date,
    required: true
  },
  duration: {
    type: Number,
    required: true,
    min: 1
  },
  attempt: {
    type: Number,
    default: 1,
    min: 1
  },
  passing_percentage: {
    type: Number,
    default: 0,
    min: 0,
    max: 100
  },
  instruction: {
    type: String,
    default: ''
  },
  is_active: {
    type: Boolean,
    default: false
  },
  is_marks_display: {
    type: Boolean,
    default: true
  },
  is_neg_marking: {
    type: Boolean,
    default: false
  },
  neg_marks: {
    type: Number,
    default: 0,
    min: 0
  },
  is_random_question: {
    type: Boolean,
    default: false
  },
  is_random_option: {
    type: Boolean,
    default: false
  },
  auto_result: {
    type: Boolean,
    default: true
  },
  exam_type: {
    type: String,
    enum: ['exam', 'quiz', 'practice'],
    default: 'exam'
  },
  session_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Session',
    required: true
  },
  created_by: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Staff',
    required: true
  },
  total_marks: {
    type: Number,
    default: 0
  },
  total_questions: {
    type: Number,
    default: 0
  },
  total_descriptive_questions: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

// Virtual for exam status
onlineExamSchema.virtual('status').get(function() {
  const now = new Date();
  if (now < this.exam_from) {
    return 'upcoming';
  } else if (now >= this.exam_from && now <= this.exam_to) {
    return 'ongoing';
  } else {
    return 'completed';
  }
});

// Virtual for duration in minutes
onlineExamSchema.virtual('duration_minutes').get(function() {
  return this.duration;
});

// Index for efficient queries
onlineExamSchema.index({ session_id: 1, is_active: 1 });
onlineExamSchema.index({ exam_from: 1, exam_to: 1 });
onlineExamSchema.index({ created_by: 1 });
onlineExamSchema.index({ is_active: 1 });

// Static method to get active exams
onlineExamSchema.statics.getActiveExams = function(sessionId) {
  return this.find({ 
    session_id: sessionId, 
    is_active: true 
  }).sort({ exam_from: -1 });
};

// Static method to get upcoming exams
onlineExamSchema.statics.getUpcomingExams = function(sessionId) {
  const now = new Date();
  return this.find({ 
    session_id: sessionId, 
    is_active: true,
    exam_from: { $gt: now }
  }).sort({ exam_from: 1 });
};

// Static method to get ongoing exams
onlineExamSchema.statics.getOngoingExams = function(sessionId) {
  const now = new Date();
  return this.find({ 
    session_id: sessionId, 
    is_active: true,
    exam_from: { $lte: now },
    exam_to: { $gte: now }
  }).sort({ exam_from: 1 });
};

// Static method to get completed exams
onlineExamSchema.statics.getCompletedExams = function(sessionId) {
  const now = new Date();
  return this.find({ 
    session_id: sessionId, 
    is_active: true,
    exam_to: { $lt: now }
  }).sort({ exam_to: -1 });
};

// Pre-save middleware to calculate totals
onlineExamSchema.pre('save', async function(next) {
  if (this.isModified('total_questions') || this.isNew) {
    // This would be calculated based on associated questions
    // For now, we'll leave it as is
  }
  next();
});

// Ensure virtual fields are serialized
onlineExamSchema.set('toJSON', { virtuals: true });
onlineExamSchema.set('toObject', { virtuals: true });

module.exports = mongoose.model('OnlineExam', onlineExamSchema);
