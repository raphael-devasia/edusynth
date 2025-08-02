const express = require('express');
const router = express.Router();
const schoolHouseController = require('../controllers/schoolHouseController');

// Create a new house
router.post('/', schoolHouseController.createHouse);
// Get all houses
router.get('/', schoolHouseController.getHouses);
// Get a house by ID
router.get('/:id', schoolHouseController.getHouseById);
// Update a house
router.put('/:id', schoolHouseController.updateHouse);
// Delete a house
router.delete('/:id', schoolHouseController.deleteHouse);

module.exports = router;
