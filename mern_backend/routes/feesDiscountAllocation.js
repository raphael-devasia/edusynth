const express = require('express');
const router = express.Router();
const feesDiscountAllocationController = require('../controllers/feesDiscountAllocationController');

// Create a new FeesDiscountAllocation
router.post('/', feesDiscountAllocationController.createFeesDiscountAllocation);

// Get all FeesDiscountAllocations
router.get('/', feesDiscountAllocationController.getAllFeesDiscountAllocations);

// Get FeesDiscountAllocation by ID
router.get('/:id', feesDiscountAllocationController.getFeesDiscountAllocationById);

// Update FeesDiscountAllocation
router.put('/:id', feesDiscountAllocationController.updateFeesDiscountAllocation);

// Delete FeesDiscountAllocation
router.delete('/:id', feesDiscountAllocationController.deleteFeesDiscountAllocation);

module.exports = router;
