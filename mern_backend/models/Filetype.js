const mongoose = require('mongoose');

const FiletypeSchema = new mongoose.Schema({
  image_extension: { type: String, required: true }, // comma-separated list
  image_mime: { type: String, required: true }, // comma-separated list
  image_size: { type: Number, required: true }, // in bytes
  file_extension: { type: String, required: true }, // comma-separated list
  file_mime: { type: String, required: true }, // comma-separated list
  file_size: { type: Number, required: true }, // in bytes
}, { timestamps: true });

module.exports = mongoose.model('Filetype', FiletypeSchema);
