const express = require('express');
const router = express.Router();
const roomTypeController = require('../controllers/roomTypeController');

// Create a new room type
router.post('/', roomTypeController.createRoomType);

// Get all room types
router.get('/', roomTypeController.getAllRoomTypes);

// Get a room type by ID
router.get('/:id', roomTypeController.getRoomTypeById);

// Update a room type
router.put('/:id', roomTypeController.updateRoomType);

// Delete a room type
router.delete('/:id', roomTypeController.deleteRoomType);

module.exports = router;
