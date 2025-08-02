const Resume = require('../models/Resume');

// Create a new resume
exports.createResume = async (req, res) => {
  try {
    const resume = new Resume(req.body);
    await resume.save();
    res.status(201).json(resume);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all resumes
exports.getAllResumes = async (req, res) => {
  try {
    const resumes = await Resume.find().populate('staff_id', 'name');
    res.json(resumes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get a resume by ID
exports.getResumeById = async (req, res) => {
  try {
    const resume = await Resume.findById(req.params.id).populate('staff_id', 'name');
    if (!resume) return res.status(404).json({ error: 'Resume not found' });
    res.json(resume);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update a resume
exports.updateResume = async (req, res) => {
  try {
    const resume = await Resume.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!resume) return res.status(404).json({ error: 'Resume not found' });
    res.json(resume);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete a resume
exports.deleteResume = async (req, res) => {
  try {
    const resume = await Resume.findByIdAndDelete(req.params.id);
    if (!resume) return res.status(404).json({ error: 'Resume not found' });
    res.json({ message: 'Resume deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
