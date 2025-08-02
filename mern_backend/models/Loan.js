const mongoose = require('mongoose');

const LoanSchema = new mongoose.Schema({
  book_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Book', required: true },
  student_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
  issue_date: { type: Date, required: true },
  due_date: { type: Date, required: true },
  return_date: { type: Date },
  fine_amount: { type: Number, default: 0 },
  remarks: { type: String },
  is_returned: { type: Boolean, default: false },
  is_active: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('Loan', LoanSchema);
