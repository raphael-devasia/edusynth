const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');

// Create a new student
router.post('/', studentController.createStudent);

// Get all students
router.get('/', studentController.getStudents);

// Get a student by ID
router.get('/:id', studentController.getStudentById);

// Update a student
router.put('/:id', studentController.updateStudent);

// Delete a student
router.delete('/:id', studentController.deleteStudent);

module.exports = router;
