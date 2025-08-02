const express = require('express');
const router = express.Router();
const examAttendanceController = require('../controllers/examAttendanceController');

// Create a new exam attendance
router.post('/', examAttendanceController.createExamAttendance);

// Get all exam attendance records
router.get('/', examAttendanceController.getAllExamAttendances);

// Get exam attendance by ID
router.get('/:id', examAttendanceController.getExamAttendanceById);

// Update exam attendance
router.put('/:id', examAttendanceController.updateExamAttendance);

// Delete exam attendance
router.delete('/:id', examAttendanceController.deleteExamAttendance);

module.exports = router;
