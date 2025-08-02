const express = require('express');
const router = express.Router();
const feeTypeController = require('../controllers/feeTypeController');

// Create a new fee type
router.post('/', feeTypeController.createFeeType);

// Get all fee types or by ID
router.get('/', feeTypeController.getFeeTypes);

// Update a fee type
router.put('/:id', feeTypeController.updateFeeType);

// Delete a fee type
router.delete('/:id', feeTypeController.deleteFeeType);

module.exports = router;
