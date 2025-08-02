const mongoose = require('mongoose');

const BookSchema = new mongoose.Schema({
  book_title: { type: String, required: true },
  description: { type: String },
  book_no: { type: String },
  isbn_no: { type: String },
  publish: { type: String },
  author: { type: String },
  subject: { type: String },
  rack_no: { type: String },
  qty: { type: Number, default: 1 },
  perunitcost: { type: Number },
  postdate: { type: Date, default: Date.now },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Book', BookSchema);
