const mongoose = require('mongoose');

const langpharsesSchema = new mongoose.Schema({
  key_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'LangKey',
    required: true
  },
  lang_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Language',
    required: true
  },
  pharses: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

// Index for efficient lookups
langpharsesSchema.index({ key_id: 1, lang_id: 1 });

module.exports = mongoose.model('Langpharses', langpharsesSchema);
