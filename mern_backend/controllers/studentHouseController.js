const StudentHouse = require('../models/StudentHouse');

// Create a new student house assignment
exports.createStudentHouse = async (req, res) => {
  try {
    const house = new StudentHouse(req.body);
    await house.save();
    res.status(201).json(house);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all student house assignments
exports.getAllStudentHouses = async (req, res) => {
  try {
    const houses = await StudentHouse.find().populate('student_id', 'name');
    res.json(houses);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get student house assignment by ID
exports.getStudentHouseById = async (req, res) => {
  try {
    const house = await StudentHouse.findById(req.params.id).populate('student_id', 'name');
    if (!house) return res.status(404).json({ error: 'StudentHouse not found' });
    res.json(house);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update student house assignment
exports.updateStudentHouse = async (req, res) => {
  try {
    const house = await StudentHouse.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!house) return res.status(404).json({ error: 'StudentHouse not found' });
    res.json(house);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete student house assignment
exports.deleteStudentHouse = async (req, res) => {
  try {
    const house = await StudentHouse.findByIdAndDelete(req.params.id);
    if (!house) return res.status(404).json({ error: 'StudentHouse not found' });
    res.json({ message: 'StudentHouse deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
