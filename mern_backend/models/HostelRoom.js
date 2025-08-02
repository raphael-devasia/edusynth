const mongoose = require('mongoose');

const HostelRoomSchema = new mongoose.Schema({
  hostel_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Hostel', required: true },
  room_number: { type: String, required: true },
  room_type: { type: String },
  bed_count: { type: Number },
  description: { type: String },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('HostelRoom', HostelRoomSchema);
