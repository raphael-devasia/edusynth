const express = require('express');
const router = express.Router();
const expenseHeadController = require('../controllers/expenseHeadController');

// Create a new expense head
router.post('/', expenseHeadController.createExpenseHead);

// Get all expense heads or by ID
router.get('/', expenseHeadController.getExpenseHeads);

// Update an expense head
router.put('/:id', expenseHeadController.updateExpenseHead);

// Delete an expense head
router.delete('/:id', expenseHeadController.deleteExpenseHead);

module.exports = router;
