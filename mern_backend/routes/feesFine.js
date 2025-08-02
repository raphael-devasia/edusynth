const express = require('express');
const router = express.Router();
const feesFineController = require('../controllers/feesFineController');

// Create a new FeesFine
router.post('/', feesFineController.createFeesFine);

// Get all FeesFines
router.get('/', feesFineController.getAllFeesFines);

// Get FeesFine by ID
router.get('/:id', feesFineController.getFeesFineById);

// Update FeesFine
router.put('/:id', feesFineController.updateFeesFine);

// Delete FeesFine
router.delete('/:id', feesFineController.deleteFeesFine);

module.exports = router;
