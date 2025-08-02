const express = require('express');
const router = express.Router();
const staffLeaveDetailController = require('../controllers/staffLeaveDetailController');

// Create a new staff leave detail
router.post('/', staffLeaveDetailController.createStaffLeaveDetail);

// Get all staff leave details
router.get('/', staffLeaveDetailController.getAllStaffLeaveDetails);

// Get a single staff leave detail by ID
router.get('/:id', staffLeaveDetailController.getStaffLeaveDetailById);

// Update a staff leave detail
router.put('/:id', staffLeaveDetailController.updateStaffLeaveDetail);

// Delete a staff leave detail
router.delete('/:id', staffLeaveDetailController.deleteStaffLeaveDetail);

module.exports = router;
