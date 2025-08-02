const express = require('express');
const router = express.Router();
const teacherController = require('../controllers/teacherController');

// Create a new teacher
router.post('/', teacherController.createTeacher);

// Get all teachers
router.get('/', teacherController.getAllTeachers);

// Get teacher by ID
router.get('/:id', teacherController.getTeacherById);

// Update teacher
router.put('/:id', teacherController.updateTeacher);

// Delete teacher
router.delete('/:id', teacherController.deleteTeacher);

module.exports = router;
