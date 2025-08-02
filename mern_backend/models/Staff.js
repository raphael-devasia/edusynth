const mongoose = require('mongoose');

const StaffSchema = new mongoose.Schema({
  employee_id: { type: String, required: true, unique: true },
  lang_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Language' },
  currency_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Currency', default: null },
  department: { type: mongoose.Schema.Types.ObjectId, ref: 'Department' },
  designation: { type: mongoose.Schema.Types.ObjectId, ref: 'Designation' },
  qualification: { type: String },
  work_exp: { type: String },
  name: { type: String, required: true },
  surname: { type: String, required: true },
  father_name: { type: String },
  mother_name: { type: String },
  contact_no: { type: String, required: true },
  emergency_contact_no: { type: String },
  email: { type: String, required: true, unique: true },
  dob: { type: Date },
  marital_status: { type: String, enum: ['single', 'married', 'divorced', 'widowed'] },
  date_of_joining: { type: Date },
  date_of_leaving: { type: Date },
  local_address: { type: String },
  permanent_address: { type: String },
  note: { type: String },
  image: { type: String }, // profile image path
  password: { type: String, required: true },
  gender: { type: String, enum: ['male', 'female', 'other'], required: true },
  
  // Banking details
  account_title: { type: String },
  bank_account_no: { type: String },
  bank_name: { type: String },
  ifsc_code: { type: String },
  bank_branch: { type: String },
  
  // Salary details
  payscale: { type: String },
  basic_salary: { type: Number },
  epf_no: { type: String },
  contract_type: { type: String, enum: ['permanent', 'contract', 'temporary'] },
  shift: { type: String },
  location: { type: String },
  
  // Social media
  facebook: { type: String },
  twitter: { type: String },
  linkedin: { type: String },
  instagram: { type: String },
  
  // Documents
  resume: { type: String }, // file path
  joining_letter: { type: String }, // file path
  resignation_letter: { type: String }, // file path
  other_document_name: { type: String },
  other_document_file: { type: String }, // file path
  
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  role_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Role' }, // Staff role assignment
  is_active: { type: Boolean, default: true },
  verification_code: { type: String },
  disable_at: { type: Date },
  
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },

  // Dynamic custom fields
  custom_fields: [{
    field_id: { type: mongoose.Schema.Types.ObjectId, ref: 'CustomField', required: true },
    value: { type: mongoose.Schema.Types.Mixed }
  }]
});

// Update the updated_at field before saving
StaffSchema.pre('save', function(next) {
  this.updated_at = Date.now();
  next();
});

module.exports = mongoose.model('Staff', StaffSchema);
