const express = require('express');
const router = express.Router();
const subjectAttendanceTypeController = require('../controllers/subjectAttendanceTypeController');

// Create a new SubjectAttendanceType
router.post('/', subjectAttendanceTypeController.createSubjectAttendanceType);

// Get all SubjectAttendanceTypes
router.get('/', subjectAttendanceTypeController.getAllSubjectAttendanceTypes);

// Get SubjectAttendanceType by ID
router.get('/:id', subjectAttendanceTypeController.getSubjectAttendanceTypeById);

// Update SubjectAttendanceType
router.put('/:id', subjectAttendanceTypeController.updateSubjectAttendanceType);

// Delete SubjectAttendanceType
router.delete('/:id', subjectAttendanceTypeController.deleteSubjectAttendanceType);

module.exports = router;
