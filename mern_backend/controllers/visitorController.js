const Visitor = require('../models/Visitor');

// Create new visitor
exports.createVisitor = async (req, res) => {
  try {
    const data = req.body;
    if (req.file) {
      data.image = `/uploads/visitors/${req.file.filename}`;
    }
    const visitor = new Visitor(data);
    await visitor.save();
    res.status(201).json(visitor);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all visitors
exports.getAllVisitors = async (req, res) => {
  try {
    const visitors = await Visitor.find().populate('staff_id student_session_id');
    res.json(visitors);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get visitor by ID
exports.getVisitorById = async (req, res) => {
  try {
    const visitor = await Visitor.findById(req.params.id).populate('staff_id student_session_id');
    if (!visitor) return res.status(404).json({ error: 'Visitor not found' });
    res.json(visitor);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update visitor
exports.updateVisitor = async (req, res) => {
  try {
    const data = req.body;
    if (req.file) {
      data.image = `/uploads/visitors/${req.file.filename}`;
    }
    const visitor = await Visitor.findByIdAndUpdate(req.params.id, data, { new: true });
    if (!visitor) return res.status(404).json({ error: 'Visitor not found' });
    res.json(visitor);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete visitor
exports.deleteVisitor = async (req, res) => {
  try {
    const visitor = await Visitor.findByIdAndDelete(req.params.id);
    if (!visitor) return res.status(404).json({ error: 'Visitor not found' });
    res.json({ message: 'Visitor deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
