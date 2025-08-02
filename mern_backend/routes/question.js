const express = require('express');
const router = express.Router();
const questionController = require('../controllers/questionController');

// Create a new question
router.post('/', questionController.createQuestion);

// Get all questions or by ID
router.get('/', questionController.getQuestions);

// Update a question
router.put('/:id', questionController.updateQuestion);

// Delete a question
router.delete('/:id', questionController.deleteQuestion);

module.exports = router;
