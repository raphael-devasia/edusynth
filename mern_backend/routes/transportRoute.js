const express = require('express');
const router = express.Router();
const transportRouteController = require('../controllers/transportRouteController');

// Create a new transport route
router.post('/', transportRouteController.createTransportRoute);

// Get all transport routes or by ID
router.get('/', transportRouteController.getTransportRoutes);

// Update a transport route
router.put('/:id', transportRouteController.updateTransportRoute);

// Delete a transport route
router.delete('/:id', transportRouteController.deleteTransportRoute);

module.exports = router;
