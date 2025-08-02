const StaffExperience = require('../models/StaffExperience');

// Create a new staff experience
exports.createStaffExperience = async (req, res) => {
  try {
    const experience = new StaffExperience(req.body);
    await experience.save();
    res.status(201).json(experience);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all staff experiences
exports.getAllStaffExperiences = async (req, res) => {
  try {
    const experiences = await StaffExperience.find().populate('staff_id', 'name');
    res.json(experiences);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get staff experience by ID
exports.getStaffExperienceById = async (req, res) => {
  try {
    const experience = await StaffExperience.findById(req.params.id).populate('staff_id', 'name');
    if (!experience) return res.status(404).json({ error: 'StaffExperience not found' });
    res.json(experience);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update staff experience
exports.updateStaffExperience = async (req, res) => {
  try {
    const experience = await StaffExperience.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!experience) return res.status(404).json({ error: 'StaffExperience not found' });
    res.json(experience);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete staff experience
exports.deleteStaffExperience = async (req, res) => {
  try {
    const experience = await StaffExperience.findByIdAndDelete(req.params.id);
    if (!experience) return res.status(404).json({ error: 'StaffExperience not found' });
    res.json({ message: 'StaffExperience deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
