const mongoose = require('mongoose');

const HostelRoomTypeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  is_active: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('HostelRoomType', HostelRoomTypeSchema);
