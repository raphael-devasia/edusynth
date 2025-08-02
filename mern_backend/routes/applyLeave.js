const express = require('express');
const router = express.Router();
const applyLeaveController = require('../controllers/applyLeaveController');

// Create a new leave application
router.post('/', applyLeaveController.createApplyLeave);

// Get all leave applications
router.get('/', applyLeaveController.getApplyLeaves);

// Get a leave application by ID
router.get('/:id', applyLeaveController.getApplyLeaveById);

// Update a leave application
router.put('/:id', applyLeaveController.updateApplyLeave);

// Delete a leave application
router.delete('/:id', applyLeaveController.deleteApplyLeave);

module.exports = router;
