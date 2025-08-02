const express = require('express');
const router = express.Router();
const incomeController = require('../controllers/incomeController');

// Create a new income
router.post('/', incomeController.createIncome);

// Get all incomes or by ID
router.get('/', incomeController.getIncomes);

// Update an income
router.put('/:id', incomeController.updateIncome);

// Delete an income
router.delete('/:id', incomeController.deleteIncome);

module.exports = router;
