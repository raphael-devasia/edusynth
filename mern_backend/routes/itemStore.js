const express = require('express');
const router = express.Router();
const itemStoreController = require('../controllers/itemStoreController');

// Create a new item store
router.post('/', itemStoreController.createItemStore);

// Get all item stores or by ID
router.get('/', itemStoreController.getItemStores);

// Update an item store
router.put('/:id', itemStoreController.updateItemStore);

// Delete an item store
router.delete('/:id', itemStoreController.deleteItemStore);

module.exports = router;
