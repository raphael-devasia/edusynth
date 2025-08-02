const mongoose = require('mongoose');

const LibraryMemberSchema = new mongoose.Schema({
  member_type: { type: String, enum: ['student', 'teacher'], required: true },
  member_id: { type: mongoose.Schema.Types.ObjectId, required: true },
  library_card_no: { type: String, required: true },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('LibraryMember', LibraryMemberSchema);
