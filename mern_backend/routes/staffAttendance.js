const express = require('express');
const router = express.Router();
const staffAttendanceController = require('../controllers/staffAttendanceController');

// Create or update staff attendance (bulk)
router.post('/', staffAttendanceController.createOrUpdateStaffAttendance);

// Get all staff attendances or by ID
router.get('/', staffAttendanceController.getStaffAttendances);

// Update a staff attendance by ID
router.put('/:id', staffAttendanceController.updateStaffAttendance);

// Delete a staff attendance by ID
router.delete('/:id', staffAttendanceController.deleteStaffAttendance);

module.exports = router;
