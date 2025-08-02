const mongoose = require('mongoose');

const InvoiceSchema = new mongoose.Schema({
  invoice_number: { type: String, required: true, unique: true },
  student_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
  date: { type: Date, required: true },
  due_date: { type: Date },
  items: [
    {
      description: { type: String, required: true },
      amount: { type: Number, required: true }
    }
  ],
  total_amount: { type: Number, required: true },
  paid_amount: { type: Number, default: 0 },
  status: { type: String, enum: ['unpaid', 'partial', 'paid'], default: 'unpaid' },
  remarks: { type: String },
  is_active: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('Invoice', InvoiceSchema);
