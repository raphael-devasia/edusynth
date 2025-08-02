const express = require('express');
const router = express.Router();
const feeDiscountController = require('../controllers/feeDiscountController');

// Create a new fee discount
router.post('/', feeDiscountController.createFeeDiscount);

// Get all fee discounts or by ID
router.get('/', feeDiscountController.getFeeDiscounts);

// Update a fee discount
router.put('/:id', feeDiscountController.updateFeeDiscount);

// Delete a fee discount
router.delete('/:id', feeDiscountController.deleteFeeDiscount);

module.exports = router;
