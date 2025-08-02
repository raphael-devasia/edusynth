const mongoose = require('mongoose');

const SubjectGroupSubjectSchema = new mongoose.Schema({
  subject_group_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'SubjectGroup',
    default: null
  },
  session_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Session',
    default: null
  },
  subject_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Subject',
    default: null
  }
}, { timestamps: true });

module.exports = mongoose.model('SubjectGroupSubject', SubjectGroupSubjectSchema);
