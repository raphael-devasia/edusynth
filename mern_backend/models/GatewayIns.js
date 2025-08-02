const mongoose = require('mongoose');

const gatewayInsSchema = new mongoose.Schema({
  unique_id: {
    type: String,
    required: true
  },
  gateway_name: {
    type: String,
    required: true,
    enum: ['paypal', 'stripe', 'razorpay', 'paytm', 'flutterwave', 'paystack', 'sslcommerz', 'ccavenue', 'instamojo', 'payu', 'mollie', 'skrill', 'payumoney']
  },
  parameter_details: {
    type: mongoose.Schema.Types.Mixed,
    default: {}
  },
  gateway_response: {
    type: mongoose.Schema.Types.Mixed,
    default: {}
  },
  payment_status: {
    type: String,
    enum: ['pending', 'success', 'failed', 'cancelled'],
    default: 'pending'
  },
  amount: {
    type: Number,
    required: true,
    min: 0
  },
  currency: {
    type: String,
    default: 'USD'
  },
  transaction_id: {
    type: String,
    default: ''
  },
  reference_id: {
    type: String,
    default: ''
  },
  student_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student',
    default: null
  },
  admission_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'OnlineAdmission',
    default: null
  },
  course_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
    default: null
  },
  fee_type: {
    type: String,
    enum: ['admission', 'fees', 'transport', 'course'],
    default: 'fees'
  },
  payment_mode: {
    type: String,
    default: 'online'
  },
  description: {
    type: String,
    default: ''
  },
  processed_at: {
    type: Date,
    default: null
  }
}, {
  timestamps: true
});

// Indexes for efficient queries
gatewayInsSchema.index({ unique_id: 1, gateway_name: 1 });
gatewayInsSchema.index({ payment_status: 1 });
gatewayInsSchema.index({ student_id: 1 });
gatewayInsSchema.index({ transaction_id: 1 });

module.exports = mongoose.model('GatewayIns', gatewayInsSchema);
