const express = require('express');
const router = express.Router();
const rolePermissionController = require('../controllers/rolePermissionController');

// Create a new role permission
router.post('/', rolePermissionController.createRolePermission);

// Get all role permissions
router.get('/', rolePermissionController.getAllRolePermissions);

// Get a role permission by ID
router.get('/:id', rolePermissionController.getRolePermissionById);

// Update a role permission
router.put('/:id', rolePermissionController.updateRolePermission);

// Delete a role permission
router.delete('/:id', rolePermissionController.deleteRolePermission);

module.exports = router;
