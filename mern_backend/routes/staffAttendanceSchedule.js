const express = require('express');
const router = express.Router();
const staffAttendanceScheduleController = require('../controllers/staffAttendanceScheduleController');

// Create a new staff attendance schedule
router.post('/', staffAttendanceScheduleController.createStaffAttendanceSchedule);

// Get all staff attendance schedules or by ID
router.get('/', staffAttendanceScheduleController.getStaffAttendanceSchedules);

// Update a staff attendance schedule
router.put('/:id', staffAttendanceScheduleController.updateStaffAttendanceSchedule);

// Delete a staff attendance schedule
router.delete('/:id', staffAttendanceScheduleController.deleteStaffAttendanceSchedule);

module.exports = router;
