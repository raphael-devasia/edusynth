const mongoose = require('mongoose');

const onlineExamQuestionSchema = new mongoose.Schema({
  onlineexam_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'OnlineExam',
    required: true
  },
  question_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Question',
    required: true
  },
  marks: {
    type: Number,
    default: 1,
    min: 0
  },
  neg_marks: {
    type: Number,
    default: 0.25,
    min: 0
  },
  question_order: {
    type: Number,
    default: 0
  },
  is_active: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Compound index to ensure unique question per exam
onlineExamQuestionSchema.index({ onlineexam_id: 1, question_id: 1 }, { unique: true });

// Index for efficient queries
onlineExamQuestionSchema.index({ onlineexam_id: 1 });
onlineExamQuestionSchema.index({ question_id: 1 });
onlineExamQuestionSchema.index({ question_order: 1 });

// Static method to get questions by exam ID
onlineExamQuestionSchema.statics.getByExamId = function(examId, options = {}) {
  const { limit, skip, questionType, subjectId } = options;
  
  let query = this.find({ onlineexam_id: examId, is_active: true })
    .populate({
      path: 'question_id',
      populate: {
        path: 'subject_id',
        select: 'name code'
      }
    });

  if (questionType) {
    query = query.populate({
      path: 'question_id',
      match: { question_type: questionType }
    });
  }

  if (subjectId) {
    query = query.populate({
      path: 'question_id',
      match: { subject_id: subjectId }
    });
  }

  if (limit) {
    query = query.limit(limit);
  }

  if (skip) {
    query = query.skip(skip);
  }

  return query.sort({ question_order: 1, createdAt: 1 });
};

// Static method to get question count by exam ID
onlineExamQuestionSchema.statics.getCountByExamId = function(examId, filters = {}) {
  let query = { onlineexam_id: examId, is_active: true };
  
  // Additional filters would be applied through population match
  return this.countDocuments(query);
};

// Static method to get exam question subjects
onlineExamQuestionSchema.statics.getExamQuestionSubjects = function(examId) {
  return this.aggregate([
    { $match: { onlineexam_id: mongoose.Types.ObjectId(examId), is_active: true } },
    {
      $lookup: {
        from: 'questions',
        localField: 'question_id',
        foreignField: '_id',
        as: 'question'
      }
    },
    { $unwind: '$question' },
    {
      $lookup: {
        from: 'subjects',
        localField: 'question.subject_id',
        foreignField: '_id',
        as: 'subject'
      }
    },
    { $unwind: '$subject' },
    {
      $group: {
        _id: '$subject._id',
        subject_name: { $first: '$subject.name' },
        subject_code: { $first: '$subject.code' },
        question_count: { $sum: 1 },
        total_marks: { $sum: '$marks' }
      }
    },
    { $sort: { subject_name: 1 } }
  ]);
};

// Instance method to calculate total marks for this question
onlineExamQuestionSchema.methods.getTotalMarks = function() {
  return this.marks;
};

// Instance method to calculate negative marks for this question
onlineExamQuestionSchema.methods.getNegativeMarks = function() {
  return this.neg_marks;
};

// Pre-save middleware to set question order if not provided
onlineExamQuestionSchema.pre('save', async function(next) {
  if (this.isNew && this.question_order === 0) {
    const lastQuestion = await this.constructor.findOne(
      { onlineexam_id: this.onlineexam_id },
      {},
      { sort: { question_order: -1 } }
    );
    
    this.question_order = lastQuestion ? lastQuestion.question_order + 1 : 1;
  }
  next();
});

module.exports = mongoose.model('OnlineExamQuestion', onlineExamQuestionSchema);
