const express = require('express');
const router = express.Router();
const feesReceiptController = require('../controllers/feesReceiptController');

// Create a new FeesReceipt
router.post('/', feesReceiptController.createFeesReceipt);

// Get all FeesReceipts
router.get('/', feesReceiptController.getAllFeesReceipts);

// Get FeesReceipt by ID
router.get('/:id', feesReceiptController.getFeesReceiptById);

// Update FeesReceipt
router.put('/:id', feesReceiptController.updateFeesReceipt);

// Delete FeesReceipt
router.delete('/:id', feesReceiptController.deleteFeesReceipt);

module.exports = router;
