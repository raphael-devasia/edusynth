const express = require('express');
const router = express.Router();
const vehicleRouteController = require('../controllers/vehicleRouteController');

// Create a new vehicle route
router.post('/', vehicleRouteController.createVehicleRoute);
// Get all vehicle routes
router.get('/', vehicleRouteController.getVehicleRoutes);
// Get a single vehicle route by ID
router.get('/:id', vehicleRouteController.getVehicleRouteById);
// Update a vehicle route
router.put('/:id', vehicleRouteController.updateVehicleRoute);
// Delete a vehicle route
router.delete('/:id', vehicleRouteController.deleteVehicleRoute);

module.exports = router;
