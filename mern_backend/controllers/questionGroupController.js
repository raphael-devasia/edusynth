const QuestionGroup = require('../models/QuestionGroup');

// Create a new QuestionGroup
exports.createQuestionGroup = async (req, res) => {
  try {
    const questionGroup = new QuestionGroup(req.body);
    await questionGroup.save();
    res.status(201).json(questionGroup);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all QuestionGroups
exports.getAllQuestionGroups = async (req, res) => {
  try {
    const questionGroups = await QuestionGroup.find();
    res.json(questionGroups);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get QuestionGroup by ID
exports.getQuestionGroupById = async (req, res) => {
  try {
    const questionGroup = await QuestionGroup.findById(req.params.id);
    if (!questionGroup) return res.status(404).json({ error: 'QuestionGroup not found' });
    res.json(questionGroup);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update QuestionGroup
exports.updateQuestionGroup = async (req, res) => {
  try {
    const questionGroup = await QuestionGroup.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!questionGroup) return res.status(404).json({ error: 'QuestionGroup not found' });
    res.json(questionGroup);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete QuestionGroup
exports.deleteQuestionGroup = async (req, res) => {
  try {
    const questionGroup = await QuestionGroup.findByIdAndDelete(req.params.id);
    if (!questionGroup) return res.status(404).json({ error: 'QuestionGroup not found' });
    res.json({ message: 'QuestionGroup deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
