const express = require('express');
const router = express.Router();
const questionOptionController = require('../controllers/questionOptionController');

// Create a new QuestionOption
router.post('/', questionOptionController.createQuestionOption);

// Get all QuestionOptions
router.get('/', questionOptionController.getAllQuestionOptions);

// Get QuestionOption by ID
router.get('/:id', questionOptionController.getQuestionOptionById);

// Update QuestionOption
router.put('/:id', questionOptionController.updateQuestionOption);

// Delete QuestionOption
router.delete('/:id', questionOptionController.deleteQuestionOption);

module.exports = router;
