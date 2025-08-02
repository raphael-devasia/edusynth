const FeesStatement = require('../models/FeesStatement');

// Create a new FeesStatement
exports.createFeesStatement = async (req, res) => {
  try {
    const feesStatement = new FeesStatement(req.body);
    await feesStatement.save();
    res.status(201).json(feesStatement);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all FeesStatements
exports.getAllFeesStatements = async (req, res) => {
  try {
    const feesStatements = await FeesStatement.find()
      .populate('student_id')
      .populate('session_id');
    res.json(feesStatements);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get FeesStatement by ID
exports.getFeesStatementById = async (req, res) => {
  try {
    const feesStatement = await FeesStatement.findById(req.params.id)
      .populate('student_id')
      .populate('session_id');
    if (!feesStatement) return res.status(404).json({ error: 'FeesStatement not found' });
    res.json(feesStatement);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update FeesStatement
exports.updateFeesStatement = async (req, res) => {
  try {
    const feesStatement = await FeesStatement.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!feesStatement) return res.status(404).json({ error: 'FeesStatement not found' });
    res.json(feesStatement);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete FeesStatement
exports.deleteFeesStatement = async (req, res) => {
  try {
    const feesStatement = await FeesStatement.findByIdAndDelete(req.params.id);
    if (!feesStatement) return res.status(404).json({ error: 'FeesStatement not found' });
    res.json({ message: 'FeesStatement deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
