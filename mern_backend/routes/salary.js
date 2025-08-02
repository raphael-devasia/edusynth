const express = require('express');
const router = express.Router();
const salaryController = require('../controllers/salaryController');

// Create a new Salary
router.post('/', salaryController.createSalary);

// Get all Salaries
router.get('/', salaryController.getAllSalaries);

// Get Salary by ID
router.get('/:id', salaryController.getSalaryById);

// Update Salary
router.put('/:id', salaryController.updateSalary);

// Delete Salary
router.delete('/:id', salaryController.deleteSalary);

module.exports = router;
