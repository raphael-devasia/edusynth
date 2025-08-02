const express = require('express');
const router = express.Router();
const feesAllocationController = require('../controllers/feesAllocationController');

// Create a new FeesAllocation
router.post('/', feesAllocationController.createFeesAllocation);

// Get all FeesAllocations
router.get('/', feesAllocationController.getAllFeesAllocations);

// Get FeesAllocation by ID
router.get('/:id', feesAllocationController.getFeesAllocationById);

// Update FeesAllocation
router.put('/:id', feesAllocationController.updateFeesAllocation);

// Delete FeesAllocation
router.delete('/:id', feesAllocationController.deleteFeesAllocation);

module.exports = router;
