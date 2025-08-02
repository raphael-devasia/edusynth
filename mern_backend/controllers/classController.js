const Class = require('../models/Class');

// Create a new class
exports.createClass = async (req, res) => {
  try {
    const classObj = new Class(req.body);
    await classObj.save();
    res.status(201).json(classObj);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all classes
exports.getClasses = async (req, res) => {
  try {
    const classes = await Class.find();
    res.json(classes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get a class by ID
exports.getClassById = async (req, res) => {
  try {
    const classObj = await Class.findById(req.params.id);
    if (!classObj) return res.status(404).json({ error: 'Class not found' });
    res.json(classObj);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update a class
exports.updateClass = async (req, res) => {
  try {
    const classObj = await Class.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!classObj) return res.status(404).json({ error: 'Class not found' });
    res.json(classObj);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete a class
exports.deleteClass = async (req, res) => {
  try {
    const classObj = await Class.findByIdAndDelete(req.params.id);
    if (!classObj) return res.status(404).json({ error: 'Class not found' });
    res.json({ message: 'Class deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
