const express = require('express');
const router = express.Router();
const homeworkEvaluationController = require('../controllers/homeworkEvaluationController');

// Create a new homework evaluation
router.post('/', homeworkEvaluationController.createHomeworkEvaluation);
// Get all homework evaluations (optionally filter by homework_id, student_id, or student_session_id)
router.get('/', homeworkEvaluationController.getHomeworkEvaluations);
// Get a single homework evaluation by ID
router.get('/:id', homeworkEvaluationController.getHomeworkEvaluationById);
// Update a homework evaluation
router.put('/:id', homeworkEvaluationController.updateHomeworkEvaluation);
// Delete a homework evaluation
router.delete('/:id', homeworkEvaluationController.deleteHomeworkEvaluation);

module.exports = router;
