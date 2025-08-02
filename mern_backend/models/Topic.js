const mongoose = require('mongoose');

const topicSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  subject_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Subject'
  },
  class_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Class'
  },
  session_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Session'
  },
  is_active: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Topic', topicSchema);
