const express = require('express');
const router = express.Router();
const leaveTypeController = require('../controllers/leaveTypeController');

// Create a new LeaveType
router.post('/', leaveTypeController.createLeaveType);

// Get all LeaveTypes
router.get('/', leaveTypeController.getAllLeaveTypes);

// Get LeaveType by ID
router.get('/:id', leaveTypeController.getLeaveTypeById);

// Update LeaveType
router.put('/:id', leaveTypeController.updateLeaveType);

// Delete LeaveType
router.delete('/:id', leaveTypeController.deleteLeaveType);

module.exports = router;
