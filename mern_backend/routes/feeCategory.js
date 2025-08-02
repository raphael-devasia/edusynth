const express = require('express');
const router = express.Router();
const feeCategoryController = require('../controllers/feeCategoryController');

// Create a new fee category
router.post('/', feeCategoryController.createFeeCategory);

// Get all fee categories
router.get('/', feeCategoryController.getFeeCategories);

// Get a fee category by ID
router.get('/:id', feeCategoryController.getFeeCategoryById);

// Update a fee category
router.put('/:id', feeCategoryController.updateFeeCategory);

// Delete a fee category
router.delete('/:id', feeCategoryController.deleteFeeCategory);

module.exports = router;
