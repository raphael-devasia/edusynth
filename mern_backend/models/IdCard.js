const mongoose = require('mongoose');

const idCardSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  school_name: {
    type: String,
    required: true
  },
  school_address: {
    type: String,
    default: ''
  },
  background: {
    type: String,
    default: ''
  },
  logo: {
    type: String,
    default: ''
  },
  sign_image: {
    type: String,
    default: ''
  },
  enable_vertical_card: {
    type: Boolean,
    default: false
  },
  enable_student_name: {
    type: Boolean,
    default: true
  },
  enable_student_photo: {
    type: Boolean,
    default: true
  },
  enable_father_name: {
    type: Boolean,
    default: true
  },
  enable_mother_name: {
    type: Boolean,
    default: false
  },
  enable_address: {
    type: Boolean,
    default: true
  },
  enable_phone: {
    type: Boolean,
    default: true
  },
  enable_dob: {
    type: Boolean,
    default: true
  },
  enable_blood_group: {
    type: Boolean,
    default: false
  },
  enable_student_barcode: {
    type: Boolean,
    default: false
  },
  enable_admission_no: {
    type: Boolean,
    default: true
  },
  enable_roll_no: {
    type: Boolean,
    default: true
  },
  enable_class: {
    type: Boolean,
    default: true
  },
  enable_section: {
    type: Boolean,
    default: true
  },
  enable_session: {
    type: Boolean,
    default: true
  },
  template: {
    type: String,
    enum: ['vertical', 'horizontal'],
    default: 'vertical'
  },
  is_active: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Index for efficient queries
idCardSchema.index({ is_active: 1 });
idCardSchema.index({ template: 1 });

module.exports = mongoose.model('IdCard', idCardSchema);
