const express = require('express');
const router = express.Router();
const studentAttendanceScheduleController = require('../controllers/studentAttendanceScheduleController');

// Create a new student attendance schedule
router.post('/', studentAttendanceScheduleController.createStudentAttendanceSchedule);

// Get all student attendance schedules or by ID
router.get('/', studentAttendanceScheduleController.getStudentAttendanceSchedules);

// Update a student attendance schedule
router.put('/:id', studentAttendanceScheduleController.updateStudentAttendanceSchedule);

// Delete a student attendance schedule
router.delete('/:id', studentAttendanceScheduleController.deleteStudentAttendanceSchedule);

module.exports = router;
