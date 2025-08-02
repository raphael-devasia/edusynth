const express = require('express');
const router = express.Router();
const modulePermissionController = require('../controllers/modulePermissionController');

// Create a new module permission
router.post('/', modulePermissionController.createModulePermission);

// Get all module permissions
router.get('/', modulePermissionController.getAllModulePermissions);

// Get a module permission by ID
router.get('/:id', modulePermissionController.getModulePermissionById);

// Update a module permission
router.put('/:id', modulePermissionController.updateModulePermission);

// Delete a module permission
router.delete('/:id', modulePermissionController.deleteModulePermission);

module.exports = router;
