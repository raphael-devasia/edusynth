const mongoose = require('mongoose');

const ItemIssueSchema = new mongoose.Schema({
  item_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Item', required: true },
  issue_to: { type: mongoose.Schema.Types.ObjectId, ref: 'Staff', required: true },
  issue_by: { type: mongoose.Schema.Types.ObjectId, ref: 'Staff', required: true },
  quantity: { type: Number, required: true },
  issue_date: { type: Date, required: true },
  return_date: { type: Date },
  description: { type: String },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('ItemIssue', ItemIssueSchema);
