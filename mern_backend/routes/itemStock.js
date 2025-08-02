const express = require('express');
const router = express.Router();
const itemStockController = require('../controllers/itemStockController');

// Create a new item stock
router.post('/', itemStockController.createItemStock);

// Get all item stocks or by ID
router.get('/', itemStockController.getItemStocks);

// Update an item stock
router.put('/:id', itemStockController.updateItemStock);

// Delete an item stock
router.delete('/:id', itemStockController.deleteItemStock);

module.exports = router;
