const express = require('express');
const router = express.Router();
const feesTypeDiscountController = require('../controllers/feesTypeDiscountController');

// Create a new FeesTypeDiscount
router.post('/', feesTypeDiscountController.createFeesTypeDiscount);

// Get all FeesTypeDiscounts
router.get('/', feesTypeDiscountController.getAllFeesTypeDiscounts);

// Get FeesTypeDiscount by ID
router.get('/:id', feesTypeDiscountController.getFeesTypeDiscountById);

// Update FeesTypeDiscount
router.put('/:id', feesTypeDiscountController.updateFeesTypeDiscount);

// Delete FeesTypeDiscount
router.delete('/:id', feesTypeDiscountController.deleteFeesTypeDiscount);

module.exports = router;
