const express = require('express');
const router = express.Router();
const questionGroupController = require('../controllers/questionGroupController');

// Create a new QuestionGroup
router.post('/', questionGroupController.createQuestionGroup);

// Get all QuestionGroups
router.get('/', questionGroupController.getAllQuestionGroups);

// Get QuestionGroup by ID
router.get('/:id', questionGroupController.getQuestionGroupById);

// Update QuestionGroup
router.put('/:id', questionGroupController.updateQuestionGroup);

// Delete QuestionGroup
router.delete('/:id', questionGroupController.deleteQuestionGroup);

module.exports = router;
