const express = require('express');
const router = express.Router();
const routePickupPointController = require('../controllers/routePickupPointController');

// Create a new route pickup point
router.post('/', routePickupPointController.createRoutePickupPoint);

// Get all route pickup points or by ID
router.get('/', routePickupPointController.getRoutePickupPoints);

// Update a route pickup point
router.put('/:id', routePickupPointController.updateRoutePickupPoint);

// Delete a route pickup point
router.delete('/:id', routePickupPointController.deleteRoutePickupPoint);

module.exports = router;
