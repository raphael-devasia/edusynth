const express = require('express');
const router = express.Router();
const inventoryController = require('../controllers/inventoryController');

// Create a new Inventory record
router.post('/', inventoryController.createInventory);

// Get all Inventory records
router.get('/', inventoryController.getAllInventories);

// Get Inventory by ID
router.get('/:id', inventoryController.getInventoryById);

// Update Inventory
router.put('/:id', inventoryController.updateInventory);

// Delete Inventory
router.delete('/:id', inventoryController.deleteInventory);

module.exports = router;
