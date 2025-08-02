const express = require('express');
const router = express.Router();
const subjectTimetableController = require('../controllers/subjectTimetableController');

// Create a new subject timetable entry
router.post('/', subjectTimetableController.createSubjectTimetable);

// Get all subject timetables or by ID
router.get('/', subjectTimetableController.getSubjectTimetables);

// Update a subject timetable
router.put('/:id', subjectTimetableController.updateSubjectTimetable);

// Delete a subject timetable
router.delete('/:id', subjectTimetableController.deleteSubjectTimetable);

module.exports = router;
