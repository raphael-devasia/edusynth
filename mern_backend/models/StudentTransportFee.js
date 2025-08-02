const mongoose = require('mongoose');

const StudentTransportFeeSchema = new mongoose.Schema({
  student_session_id: { type: mongoose.Schema.Types.ObjectId, ref: 'StudentSession', required: true },
  route_pickup_point_id: { type: mongoose.Schema.Types.ObjectId, ref: 'RoutePickupPoint', required: true },
  amount: { type: Number, required: true },
  due_date: { type: Date },
  paid: { type: Boolean, default: false },
  paid_date: { type: Date },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('StudentTransportFee', StudentTransportFeeSchema);
