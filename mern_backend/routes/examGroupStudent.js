const express = require('express');
const router = express.Router();
const examGroupStudentController = require('../controllers/examGroupStudentController');

// Create a new exam group student
router.post('/', examGroupStudentController.createExamGroupStudent);

// Get exam group students by filters
router.get('/', examGroupStudentController.getExamGroupStudents);

// Update an exam group student
router.put('/:id', examGroupStudentController.updateExamGroupStudent);

// Delete an exam group student
router.delete('/:id', examGroupStudentController.deleteExamGroupStudent);

module.exports = router;
