const express = require('express');
const router = express.Router();
const gatewayInsController = require('../controllers/gatewayInsController');

// Create or update a gateway instance
router.post('/', gatewayInsController.createOrUpdateGatewayIns);

// Get gateway instance by unique_id and gateway_name
router.get('/unique/:unique_id/gateway/:gateway_name', gatewayInsController.getGatewayIns);

// Get all gateway instances (with optional filters)
router.get('/', gatewayInsController.getAllGatewayIns);

// Get gateway instance by ID
router.get('/:id', gatewayInsController.getGatewayInsById);

// Get gateway instances by gateway name
router.get('/name/:gateway_name', gatewayInsController.getGatewayInsByName);

// Update payment status by unique_id and gateway_name
router.patch('/unique/:unique_id/gateway/:gateway_name/payment-status', gatewayInsController.updatePaymentStatus);

// Delete gateway instance by ID
router.delete('/:id', gatewayInsController.deleteGatewayIns);

// Get payment processing data by gateway_ins_id
router.get('/processing/:gateway_ins_id', gatewayInsController.getPaymentProcessing);

// Get payment statistics
router.get('/stats', gatewayInsController.getPaymentStats);

module.exports = router;
