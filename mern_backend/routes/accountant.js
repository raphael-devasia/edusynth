const express = require('express');
const router = express.Router();
const accountantController = require('../controllers/accountantController');

// Create a new accountant
router.post('/', accountantController.createAccountant);

// Get all accountants
router.get('/', accountantController.getAccountants);

// Get an accountant by ID
router.get('/:id', accountantController.getAccountantById);

// Update an accountant
router.put('/:id', accountantController.updateAccountant);

// Delete an accountant
router.delete('/:id', accountantController.deleteAccountant);

module.exports = router;
