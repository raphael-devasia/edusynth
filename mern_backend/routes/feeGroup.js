const express = require('express');
const router = express.Router();
const feeGroupController = require('../controllers/feeGroupController');

// Create a new fee group
router.post('/', feeGroupController.createFeeGroup);

// Get all fee groups or by ID
router.get('/', feeGroupController.getFeeGroups);

// Update a fee group
router.put('/:id', feeGroupController.updateFeeGroup);

// Delete a fee group
router.delete('/:id', feeGroupController.deleteFeeGroup);

module.exports = router;
