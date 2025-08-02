const express = require('express');
const router = express.Router();
const loanController = require('../controllers/loanController');

// Create a new Loan
router.post('/', loanController.createLoan);

// Get all Loans
router.get('/', loanController.getAllLoans);

// Get Loan by ID
router.get('/:id', loanController.getLoanById);

// Update Loan
router.put('/:id', loanController.updateLoan);

// Delete Loan
router.delete('/:id', loanController.deleteLoan);

module.exports = router;
