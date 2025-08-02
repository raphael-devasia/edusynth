const express = require('express');
const router = express.Router();
const roleController = require('../controllers/roleController');

// Create a new role
router.post('/', roleController.createRole);

// Get all roles or by ID
router.get('/', roleController.getRoles);

// Update a role
router.put('/:id', roleController.updateRole);

// Delete a role
router.delete('/:id', roleController.deleteRole);

module.exports = router;
