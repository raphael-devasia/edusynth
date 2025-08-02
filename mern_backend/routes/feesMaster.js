const express = require('express');
const router = express.Router();
const feesMasterController = require('../controllers/feesMasterController');

// Create a new FeesMaster
router.post('/', feesMasterController.createFeesMaster);

// Get all FeesMasters
router.get('/', feesMasterController.getAllFeesMasters);

// Get FeesMaster by ID
router.get('/:id', feesMasterController.getFeesMasterById);

// Update FeesMaster
router.put('/:id', feesMasterController.updateFeesMaster);

// Delete FeesMaster
router.delete('/:id', feesMasterController.deleteFeesMaster);

module.exports = router;
