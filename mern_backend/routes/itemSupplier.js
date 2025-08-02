const express = require('express');
const router = express.Router();
const itemSupplierController = require('../controllers/itemSupplierController');

// Create a new item supplier
router.post('/', itemSupplierController.createItemSupplier);

// Get all item suppliers or by ID
router.get('/', itemSupplierController.getItemSuppliers);

// Update an item supplier
router.put('/:id', itemSupplierController.updateItemSupplier);

// Delete an item supplier
router.delete('/:id', itemSupplierController.deleteItemSupplier);

module.exports = router;
