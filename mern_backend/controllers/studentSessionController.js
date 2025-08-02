const StudentSession = require('../models/StudentSession');

// Create new student session
exports.createStudentSession = async (req, res) => {
  try {
    const studentSession = new StudentSession(req.body);
    await studentSession.save();
    res.status(201).json(studentSession);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all student sessions
exports.getAllStudentSessions = async (req, res) => {
  try {
    const sessions = await StudentSession.find()
      .populate('session_id student_id class_id section_id hostel_room_id vehroute_id route_pickup_point_id');
    res.json(sessions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get student session by ID
exports.getStudentSessionById = async (req, res) => {
  try {
    const session = await StudentSession.findById(req.params.id)
      .populate('session_id student_id class_id section_id hostel_room_id vehroute_id route_pickup_point_id');
    if (!session) return res.status(404).json({ error: 'Student session not found' });
    res.json(session);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update student session
exports.updateStudentSession = async (req, res) => {
  try {
    const session = await StudentSession.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!session) return res.status(404).json({ error: 'Student session not found' });
    res.json(session);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete student session
exports.deleteStudentSession = async (req, res) => {
  try {
    const session = await StudentSession.findByIdAndDelete(req.params.id);
    if (!session) return res.status(404).json({ error: 'Student session not found' });
    res.json({ message: 'Student session deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
