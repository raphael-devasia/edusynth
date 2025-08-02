const express = require('express');
const router = express.Router();
const staffLeaveAllotmentController = require('../controllers/staffLeaveAllotmentController');

// Create a new staff leave allotment
router.post('/', staffLeaveAllotmentController.createAllotment);

// Get all allotments, or filter by staff/leaveType/session
router.get('/', staffLeaveAllotmentController.getAllotments);

// Get a single allotment by ID
router.get('/:id', staffLeaveAllotmentController.getAllotmentById);

// Update an allotment
router.put('/:id', staffLeaveAllotmentController.updateAllotment);

// Delete an allotment
router.delete('/:id', staffLeaveAllotmentController.deleteAllotment);

module.exports = router;
