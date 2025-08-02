const express = require('express');
const router = express.Router();
const invoiceController = require('../controllers/invoiceController');

// Create a new Invoice
router.post('/', invoiceController.createInvoice);

// Get all Invoices
router.get('/', invoiceController.getAllInvoices);

// Get Invoice by ID
router.get('/:id', invoiceController.getInvoiceById);

// Update Invoice
router.put('/:id', invoiceController.updateInvoice);

// Delete Invoice
router.delete('/:id', invoiceController.deleteInvoice);

module.exports = router;
