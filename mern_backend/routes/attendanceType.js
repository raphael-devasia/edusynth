const express = require('express');
const router = express.Router();
const attendanceTypeController = require('../controllers/attendanceTypeController');

// Create a new attendance type
router.post('/', attendanceTypeController.createAttendanceType);

// Get all attendance types
router.get('/', attendanceTypeController.getAttendanceTypes);

// Get an attendance type by ID
router.get('/:id', attendanceTypeController.getAttendanceTypeById);

// Update an attendance type
router.put('/:id', attendanceTypeController.updateAttendanceType);

// Delete an attendance type
router.delete('/:id', attendanceTypeController.deleteAttendanceType);

module.exports = router;
