const express = require('express');
const router = express.Router();
const currencyController = require('../controllers/currencyController');

// Create a new currency
router.post('/', currencyController.createCurrency);

// Get all currencies or by ID
router.get('/', currencyController.getCurrencies);

// Update a currency
router.put('/:id', currencyController.updateCurrency);

// Delete a currency
router.delete('/:id', currencyController.deleteCurrency);

module.exports = router;
