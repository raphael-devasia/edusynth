const mongoose = require('mongoose');

const LibraryManagementSchema = new mongoose.Schema({
  member_type: { type: String, required: true },
  member_id: { type: mongoose.Schema.Types.ObjectId, required: true },
  library_card_no: { type: String, required: true },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('LibraryManagement', LibraryManagementSchema);
