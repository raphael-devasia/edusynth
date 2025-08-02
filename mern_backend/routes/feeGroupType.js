const express = require('express');
const router = express.Router();
const feeGroupTypeController = require('../controllers/feeGroupTypeController');

// Create a new fee group type
router.post('/', feeGroupTypeController.createFeeGroupType);

// Get all fee group types or by ID
router.get('/', feeGroupTypeController.getFeeGroupTypes);

// Update a fee group type
router.put('/:id', feeGroupTypeController.updateFeeGroupType);

// Delete a fee group type
router.delete('/:id', feeGroupTypeController.deleteFeeGroupType);

module.exports = router;
