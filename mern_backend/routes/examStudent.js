const express = require('express');
const router = express.Router();
const examStudentController = require('../controllers/examStudentController');

// Create a new exam student
router.post('/', examStudentController.createExamStudent);

// Get all exam students or by filter
router.get('/', examStudentController.getExamStudents);

// Update an exam student
router.put('/:id', examStudentController.updateExamStudent);

// Delete an exam student
router.delete('/:id', examStudentController.deleteExamStudent);

module.exports = router;
