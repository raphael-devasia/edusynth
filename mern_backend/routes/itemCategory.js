const express = require('express');
const router = express.Router();
const itemCategoryController = require('../controllers/itemCategoryController');

// Create a new item category
router.post('/', itemCategoryController.createItemCategory);

// Get all item categories or by ID
router.get('/', itemCategoryController.getItemCategories);

// Update an item category
router.put('/:id', itemCategoryController.updateItemCategory);

// Delete an item category
router.delete('/:id', itemCategoryController.deleteItemCategory);

module.exports = router;
