const mongoose = require('mongoose');

const BookIssueSchema = new mongoose.Schema({
  book_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Book', required: true },
  member_id: { type: mongoose.Schema.Types.ObjectId, required: true }, // could be Student, Staff, etc.
  issue_date: { type: Date, required: true },
  due_date: { type: Date, required: true },
  return_date: { type: Date },
  is_returned: { type: Boolean, default: false },
  remarks: { type: String },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('BookIssue', BookIssueSchema);
