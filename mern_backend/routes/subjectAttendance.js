const express = require('express');
const router = express.Router();
const subjectAttendanceController = require('../controllers/subjectAttendanceController');

// Create a new SubjectAttendance
router.post('/', subjectAttendanceController.createSubjectAttendance);

// Get all SubjectAttendances
router.get('/', subjectAttendanceController.getAllSubjectAttendances);

// Get SubjectAttendance by ID
router.get('/:id', subjectAttendanceController.getSubjectAttendanceById);

// Update SubjectAttendance
router.put('/:id', subjectAttendanceController.updateSubjectAttendance);

// Delete SubjectAttendance
router.delete('/:id', subjectAttendanceController.deleteSubjectAttendance);

module.exports = router;
