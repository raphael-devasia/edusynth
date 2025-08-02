const mongoose = require('mongoose');

const StudentSessionSchema = new mongoose.Schema({
  session_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Session' },
  student_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Student' },
  class_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Class' },
  section_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Section' },
  hostel_room_id: { type: mongoose.Schema.Types.ObjectId, ref: 'HostelRoom', default: null },
  vehroute_id: { type: mongoose.Schema.Types.ObjectId, ref: 'TransportRoute', default: null },
  route_pickup_point_id: { type: mongoose.Schema.Types.ObjectId, ref: 'RoutePickupPoint', default: null },
  transport_fees: { type: Number, default: 0.00 },
  fees_discount: { type: Number, default: 0.00 },
  is_leave: { type: Boolean, default: false },
  is_active: { type: String, enum: ['yes', 'no'], default: 'no' },
  is_alumni: { type: Boolean, default: false },
  default_login: { type: Boolean, default: false },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});

StudentSessionSchema.pre('save', function(next) {
  this.updated_at = Date.now();
  next();
});

module.exports = mongoose.model('StudentSession', StudentSessionSchema);
