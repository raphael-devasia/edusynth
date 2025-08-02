const express = require('express');
const router = express.Router();
const payrollController = require('../controllers/payrollController');

// Create a new payroll record
router.post('/', payrollController.createPayroll);

// Get all payroll records or by ID
router.get('/', payrollController.getPayrolls);

// Update a payroll record
router.put('/:id', payrollController.updatePayroll);

// Delete a payroll record
router.delete('/:id', payrollController.deletePayroll);

module.exports = router;
