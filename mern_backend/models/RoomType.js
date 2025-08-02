const mongoose = require('mongoose');

const RoomTypeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, default: '' },
  is_active: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('RoomType', RoomTypeSchema);
