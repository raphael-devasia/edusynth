const express = require('express');
const router = express.Router();
const feeSessionGroupController = require('../controllers/feeSessionGroupController');

// Create a new fee session group
router.post('/', feeSessionGroupController.createFeeSessionGroup);

// Get all fee session groups or by ID
router.get('/', feeSessionGroupController.getFeeSessionGroups);

// Update a fee session group
router.put('/:id', feeSessionGroupController.updateFeeSessionGroup);

// Delete a fee session group
router.delete('/:id', feeSessionGroupController.deleteFeeSessionGroup);

module.exports = router;
