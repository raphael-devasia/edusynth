const ClassSection = require('../models/ClassSection');

// Create a new class section
exports.createClassSection = async (req, res) => {
  try {
    const classSection = new ClassSection(req.body);
    await classSection.save();
    res.status(201).json(classSection);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all class sections for a class
exports.getClassSectionsByClass = async (req, res) => {
  try {
    const classSections = await ClassSection.find({ class_id: req.params.classId }).populate('section_id');
    res.json(classSections);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update a class section
exports.updateClassSection = async (req, res) => {
  try {
    const classSection = await ClassSection.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!classSection) return res.status(404).json({ error: 'ClassSection not found' });
    res.json(classSection);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete a class section
exports.deleteClassSection = async (req, res) => {
  try {
    const classSection = await ClassSection.findByIdAndDelete(req.params.id);
    if (!classSection) return res.status(404).json({ error: 'ClassSection not found' });
    res.json({ message: 'ClassSection deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
