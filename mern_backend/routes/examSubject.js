const express = require('express');
const router = express.Router();
const examSubjectController = require('../controllers/examSubjectController');

// Create a new exam subject
router.post('/', examSubjectController.createExamSubject);

// Get all exam subjects or by filter
router.get('/', examSubjectController.getExamSubjects);

// Update an exam subject
router.put('/:id', examSubjectController.updateExamSubject);

// Delete an exam subject
router.delete('/:id', examSubjectController.deleteExamSubject);

module.exports = router;
