const Homework = require('../models/Homework');

// Create a new homework
exports.createHomework = async (req, res) => {
  try {
    const homework = new Homework(req.body);
    await homework.save();
    res.status(201).json(homework);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all homework
exports.getHomeworks = async (req, res) => {
  try {
    const homeworks = await Homework.find().populate('class_id section_id subject_id created_by');
    res.json(homeworks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get a homework by ID
exports.getHomeworkById = async (req, res) => {
  try {
    const homework = await Homework.findById(req.params.id).populate('class_id section_id subject_id created_by');
    if (!homework) return res.status(404).json({ error: 'Homework not found' });
    res.json(homework);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update a homework
exports.updateHomework = async (req, res) => {
  try {
    const homework = await Homework.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!homework) return res.status(404).json({ error: 'Homework not found' });
    res.json(homework);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete a homework
exports.deleteHomework = async (req, res) => {
  try {
    const homework = await Homework.findByIdAndDelete(req.params.id);
    if (!homework) return res.status(404).json({ error: 'Homework not found' });
    res.json({ message: 'Homework deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
