const express = require('express');
const router = express.Router();
const moduleController = require('../controllers/moduleController');

// Create a new module
router.post('/', moduleController.createModule);

// Get all modules
router.get('/', moduleController.getAllModules);

// Get a module by ID
router.get('/:id', moduleController.getModuleById);

// Update a module
router.put('/:id', moduleController.updateModule);

// Delete a module
router.delete('/:id', moduleController.deleteModule);

module.exports = router;
