const express = require('express');
const router = express.Router();
const incomeHeadController = require('../controllers/incomeHeadController');

// Create a new income head
router.post('/', incomeHeadController.createIncomeHead);

// Get all income heads or by ID
router.get('/', incomeHeadController.getIncomeHeads);

// Update an income head
router.put('/:id', incomeHeadController.updateIncomeHead);

// Delete an income head
router.delete('/:id', incomeHeadController.deleteIncomeHead);

module.exports = router;
