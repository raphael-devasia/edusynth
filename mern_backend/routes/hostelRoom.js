const express = require('express');
const router = express.Router();
const hostelRoomController = require('../controllers/hostelRoomController');

// Create a new hostel room
router.post('/', hostelRoomController.createHostelRoom);

// Get all hostel rooms or by ID
router.get('/', hostelRoomController.getHostelRooms);

// Update a hostel room
router.put('/:id', hostelRoomController.updateHostelRoom);

// Delete a hostel room
router.delete('/:id', hostelRoomController.deleteHostelRoom);

module.exports = router;
