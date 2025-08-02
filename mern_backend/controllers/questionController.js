const Question = require('../models/Question');

// Create a new question
exports.createQuestion = async (req, res) => {
  try {
    const question = new Question(req.body);
    await question.save();
    res.status(201).json(question);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all questions or by ID
exports.getQuestions = async (req, res) => {
  try {
    const { id } = req.query;
    if (id) {
      const question = await Question.findById(id)
        .populate('subject_id')
        .populate('class_id')
        .populate('section_id');
      if (!question) return res.status(404).json({ error: 'Question not found' });
      res.json(question);
    } else {
      const questions = await Question.find()
        .populate('subject_id')
        .populate('class_id')
        .populate('section_id');
      res.json(questions);
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update a question
exports.updateQuestion = async (req, res) => {
  try {
    const question = await Question.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!question) return res.status(404).json({ error: 'Question not found' });
    res.json(question);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete a question
exports.deleteQuestion = async (req, res) => {
  try {
    const question = await Question.findByIdAndDelete(req.params.id);
    if (!question) return res.status(404).json({ error: 'Question not found' });
    res.json({ message: 'Question deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
