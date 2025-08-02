const express = require('express');
const router = express.Router();
const feesPaymentController = require('../controllers/feesPaymentController');

// Create a new FeesPayment
router.post('/', feesPaymentController.createFeesPayment);

// Get all FeesPayments
router.get('/', feesPaymentController.getAllFeesPayments);

// Get FeesPayment by ID
router.get('/:id', feesPaymentController.getFeesPaymentById);

// Update FeesPayment
router.put('/:id', feesPaymentController.updateFeesPayment);

// Delete FeesPayment
router.delete('/:id', feesPaymentController.deleteFeesPayment);

module.exports = router;
