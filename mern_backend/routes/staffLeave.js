const express = require('express');
const router = express.Router();
const staffLeaveController = require('../controllers/staffLeaveController');

// Create a new staff leave
router.post('/', staffLeaveController.createStaffLeave);

// Get all staff leaves
router.get('/', staffLeaveController.getAllStaffLeaves);

// Get a single staff leave by ID
router.get('/:id', staffLeaveController.getStaffLeaveById);

// Update a staff leave
router.put('/:id', staffLeaveController.updateStaffLeave);

// Delete a staff leave
router.delete('/:id', staffLeaveController.deleteStaffLeave);

module.exports = router;
