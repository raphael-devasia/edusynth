const express = require('express');
const router = express.Router();
const examController = require('../controllers/examController');

// Create a new exam
router.post('/', examController.createExam);

// Get all exams or by ID
router.get('/', examController.getExams);

// Update an exam
router.put('/:id', examController.updateExam);

// Delete an exam
router.delete('/:id', examController.deleteExam);

module.exports = router;
