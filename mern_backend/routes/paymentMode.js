const express = require('express');
const router = express.Router();
const paymentModeController = require('../controllers/paymentModeController');

// Create a new PaymentMode
router.post('/', paymentModeController.createPaymentMode);

// Get all PaymentModes
router.get('/', paymentModeController.getAllPaymentModes);

// Get PaymentMode by ID
router.get('/:id', paymentModeController.getPaymentModeById);

// Update PaymentMode
router.put('/:id', paymentModeController.updatePaymentMode);

// Delete PaymentMode
router.delete('/:id', paymentModeController.deletePaymentMode);

module.exports = router;
