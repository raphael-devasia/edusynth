const express = require('express');
const router = express.Router();
const subjectTeacherController = require('../controllers/subjectTeacherController');

// Create a new SubjectTeacher
router.post('/', subjectTeacherController.createSubjectTeacher);

// Get all SubjectTeachers
router.get('/', subjectTeacherController.getAllSubjectTeachers);

// Get SubjectTeacher by ID
router.get('/:id', subjectTeacherController.getSubjectTeacherById);

// Update SubjectTeacher
router.put('/:id', subjectTeacherController.updateSubjectTeacher);

// Delete SubjectTeacher
router.delete('/:id', subjectTeacherController.deleteSubjectTeacher);

module.exports = router;
