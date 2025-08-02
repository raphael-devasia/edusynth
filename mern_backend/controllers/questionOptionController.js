const QuestionOption = require('../models/QuestionOption');

// Create a new QuestionOption
exports.createQuestionOption = async (req, res) => {
  try {
    const questionOption = new QuestionOption(req.body);
    await questionOption.save();
    res.status(201).json(questionOption);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all QuestionOptions
exports.getAllQuestionOptions = async (req, res) => {
  try {
    const questionOptions = await QuestionOption.find().populate('question_id');
    res.json(questionOptions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get QuestionOption by ID
exports.getQuestionOptionById = async (req, res) => {
  try {
    const questionOption = await QuestionOption.findById(req.params.id).populate('question_id');
    if (!questionOption) return res.status(404).json({ error: 'QuestionOption not found' });
    res.json(questionOption);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update QuestionOption
exports.updateQuestionOption = async (req, res) => {
  try {
    const questionOption = await QuestionOption.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!questionOption) return res.status(404).json({ error: 'QuestionOption not found' });
    res.json(questionOption);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete QuestionOption
exports.deleteQuestionOption = async (req, res) => {
  try {
    const questionOption = await QuestionOption.findByIdAndDelete(req.params.id);
    if (!questionOption) return res.status(404).json({ error: 'QuestionOption not found' });
    res.json({ message: 'QuestionOption deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
