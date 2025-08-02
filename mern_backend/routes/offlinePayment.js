const express = require('express');
const router = express.Router();
const offlinePaymentController = require('../controllers/offlinePaymentController');

// Create a new offline payment
router.post('/', offlinePaymentController.createOfflinePayment);

// Get all offline payments or by ID
router.get('/', offlinePaymentController.getOfflinePayments);

// Update an offline payment
router.put('/:id', offlinePaymentController.updateOfflinePayment);

// Delete an offline payment
router.delete('/:id', offlinePaymentController.deleteOfflinePayment);

module.exports = router;
