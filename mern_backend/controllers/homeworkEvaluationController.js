const HomeworkEvaluation = require('../models/HomeworkEvaluation');

// Create a new homework evaluation
exports.createHomeworkEvaluation = async (req, res) => {
  try {
    const homeworkEvaluation = new HomeworkEvaluation(req.body);
    await homeworkEvaluation.save();
    res.status(201).json(homeworkEvaluation);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all homework evaluations (optionally filter by homework_id, student_id, or student_session_id)
exports.getHomeworkEvaluations = async (req, res) => {
  try {
    const { homework_id, student_id, student_session_id } = req.query;
    let query = {};
    if (homework_id) query.homework_id = homework_id;
    if (student_id) query.student_id = student_id;
    if (student_session_id) query.student_session_id = student_session_id;
    const evaluations = await HomeworkEvaluation.find(query)
      .populate('homework_id')
      .populate('student_id')
      .populate('student_session_id');
    res.json(evaluations);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get a single homework evaluation by ID
exports.getHomeworkEvaluationById = async (req, res) => {
  try {
    const evaluation = await HomeworkEvaluation.findById(req.params.id)
      .populate('homework_id')
      .populate('student_id')
      .populate('student_session_id');
    if (!evaluation) return res.status(404).json({ error: 'Homework evaluation not found' });
    res.json(evaluation);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update a homework evaluation
exports.updateHomeworkEvaluation = async (req, res) => {
  try {
    const evaluation = await HomeworkEvaluation.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!evaluation) return res.status(404).json({ error: 'Homework evaluation not found' });
    res.json(evaluation);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete a homework evaluation
exports.deleteHomeworkEvaluation = async (req, res) => {
  try {
    const evaluation = await HomeworkEvaluation.findByIdAndDelete(req.params.id);
    if (!evaluation) return res.status(404).json({ error: 'Homework evaluation not found' });
    res.json({ message: 'Homework evaluation deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
