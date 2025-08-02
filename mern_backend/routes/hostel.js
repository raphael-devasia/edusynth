const express = require('express');
const router = express.Router();
const hostelController = require('../controllers/hostelController');

// Create a new hostel
router.post('/', hostelController.createHostel);

// Get all hostels or by ID
router.get('/', hostelController.getHostels);

// Update a hostel
router.put('/:id', hostelController.updateHostel);

// Delete a hostel
router.delete('/:id', hostelController.deleteHostel);

module.exports = router;
