const StudentTransportFee = require('../models/StudentTransportFee');

// Create a new student transport fee
exports.createStudentTransportFee = async (req, res) => {
  try {
    const studentTransportFee = new StudentTransportFee(req.body);
    await studentTransportFee.save();
    res.status(201).json(studentTransportFee);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all student transport fees or by filter
exports.getStudentTransportFees = async (req, res) => {
  try {
    const filter = req.query || {};
    const studentTransportFees = await StudentTransportFee.find(filter)
      .populate('student_session_id route_pickup_point_id');
    res.json(studentTransportFees);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update a student transport fee
exports.updateStudentTransportFee = async (req, res) => {
  try {
    const studentTransportFee = await StudentTransportFee.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!studentTransportFee) return res.status(404).json({ error: 'StudentTransportFee not found' });
    res.json(studentTransportFee);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete a student transport fee
exports.deleteStudentTransportFee = async (req, res) => {
  try {
    const studentTransportFee = await StudentTransportFee.findByIdAndDelete(req.params.id);
    if (!studentTransportFee) return res.status(404).json({ error: 'StudentTransportFee not found' });
    res.json({ message: 'StudentTransportFee deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
