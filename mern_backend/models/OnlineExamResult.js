const mongoose = require('mongoose');

const onlineExamResultSchema = new mongoose.Schema({
  onlineexam_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'OnlineExam',
    required: true
  },
  student_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student',
    required: true
  },
  onlineexam_student_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'OnlineExamStudent',
    required: true
  },
  onlineexam_question_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'OnlineExamQuestion',
    required: true
  },
  question_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Question',
    required: true
  },
  answer: {
    type: String,
    default: ''
  },
  select_option: {
    type: String,
    default: ''
  },
  marks: {
    type: Number,
    default: 0
  },
  neg_marks: {
    type: Number,
    default: 0
  },
  is_evaluated: {
    type: Boolean,
    default: false
  },
  remarks: {
    type: String,
    default: ''
  },
  evaluated_by: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null
  },
  evaluated_at: {
    type: Date
  }
}, {
  timestamps: true
});

// Compound index for efficient lookup
onlineExamResultSchema.index({ onlineexam_id: 1, student_id: 1, onlineexam_question_id: 1 }, { unique: true });

// Static method to get results by student and exam
onlineExamResultSchema.statics.getResultByStudent = function(onlineexam_student_id, exam_id) {
  return this.find({
    onlineexam_student_id,
    onlineexam_id: exam_id
  })
    .populate('onlineexam_question_id')
    .populate('question_id');
};

// Static method to get students by exam/class/section
onlineExamResultSchema.statics.getStudentByExam = function(exam_id, class_id, section_id) {
  // This would require population from student_session, class, section, etc.
  // For now, return all results for the exam (to be refined in controller)
  return this.find({ onlineexam_id: exam_id });
};

// Static method to check if result is prepared for a student
onlineExamResultSchema.statics.checkResultPrepare = function(onlineexam_student_id) {
  return this.find({ onlineexam_student_id });
};

// Static method to get rank (to be implemented in controller via aggregation)

module.exports = mongoose.model('OnlineExamResult', onlineExamResultSchema);
