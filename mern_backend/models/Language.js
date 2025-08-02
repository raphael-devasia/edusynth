const mongoose = require('mongoose');

const languageSchema = new mongoose.Schema({
  language: {
    type: String,
    required: true,
    unique: true
  },
  language_code: {
    type: String,
    required: true,
    unique: true
  },
  is_active: {
    type: Boolean,
    default: true
  },
  is_rtl: {
    type: Boolean,
    default: false
  },
  is_default: {
    type: Boolean,
    default: false
  },
  flag: {
    type: String,
    default: ''
  },
  created_at: {
    type: Date,
    default: Date.now
  },
  updated_at: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Pre-save middleware to update the updated_at field
languageSchema.pre('save', function(next) {
  this.updated_at = new Date();
  next();
});

// Pre-update middleware to update the updated_at field
languageSchema.pre('findOneAndUpdate', function(next) {
  this.set({ updated_at: new Date() });
  next();
});

// Index for efficient queries
languageSchema.index({ is_active: 1 });
languageSchema.index({ is_default: 1 });
languageSchema.index({ language_code: 1 });

// Static method to get enabled languages
languageSchema.statics.getEnabledLanguages = function() {
  return this.find({ is_active: true }).sort({ language: 1 });
};

// Static method to get default language
languageSchema.statics.getDefaultLanguage = function() {
  return this.findOne({ is_default: true });
};

// Instance method to check if language exists
languageSchema.statics.checkExists = function(language, id = null) {
  const query = { language };
  if (id) {
    query._id = { $ne: id };
  }
  return this.findOne(query);
};

module.exports = mongoose.model('Language', languageSchema);
