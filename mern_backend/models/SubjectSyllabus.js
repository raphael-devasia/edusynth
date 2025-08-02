const mongoose = require('mongoose');

const SubjectSyllabusSchema = new mongoose.Schema({
  topic_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Topic',
    required: true
  },
  session_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Session',
    required: true
  },
  created_by: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  created_for: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  time_from: {
    type: String,
    required: true
  },
  time_to: {
    type: String,
    required: true
  },
  presentation: {
    type: String,
    default: ''
  },
  attachment: {
    type: String,
    default: ''
  },
  lacture_youtube_url: {
    type: String,
    default: ''
  },
  lacture_video: {
    type: String,
    default: ''
  },
  sub_topic: {
    type: String,
    default: ''
  },
  teaching_method: {
    type: String,
    default: ''
  },
  general_objectives: {
    type: String,
    default: ''
  },
  previous_knowledge: {
    type: String,
    default: ''
  },
  comprehensive_questions: {
    type: String,
    default: ''
  },
  status: {
    type: Number,
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model('SubjectSyllabus', SubjectSyllabusSchema);
