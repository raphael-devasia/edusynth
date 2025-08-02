const express = require('express');
const router = express.Router();
const pickupPointController = require('../controllers/pickupPointController');

// Create a new pickup point
router.post('/', pickupPointController.createPickupPoint);

// Get all pickup points or by ID
router.get('/', pickupPointController.getPickupPoints);

// Update a pickup point
router.put('/:id', pickupPointController.updatePickupPoint);

// Delete a pickup point
router.delete('/:id', pickupPointController.deletePickupPoint);

module.exports = router;
