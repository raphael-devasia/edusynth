const express = require('express');
const router = express.Router();
const hostelRoomTypeController = require('../controllers/hostelRoomTypeController');

// Create a new HostelRoomType
router.post('/', hostelRoomTypeController.createHostelRoomType);

// Get all HostelRoomTypes
router.get('/', hostelRoomTypeController.getAllHostelRoomTypes);

// Get HostelRoomType by ID
router.get('/:id', hostelRoomTypeController.getHostelRoomTypeById);

// Update HostelRoomType
router.put('/:id', hostelRoomTypeController.updateHostelRoomType);

// Delete HostelRoomType
router.delete('/:id', hostelRoomTypeController.deleteHostelRoomType);

module.exports = router;
