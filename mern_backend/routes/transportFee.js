const express = require('express');
const router = express.Router();
const transportFeeController = require('../controllers/transportFeeController');

// Create a new transport fee
router.post('/', transportFeeController.createTransportFee);

// Get all transport fees or by filter
router.get('/', transportFeeController.getTransportFees);

// Update a transport fee
router.put('/:id', transportFeeController.updateTransportFee);

// Delete a transport fee
router.delete('/:id', transportFeeController.deleteTransportFee);

module.exports = router;
