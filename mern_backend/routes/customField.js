const express = require('express');
const router = express.Router();
const customFieldController = require('../controllers/customFieldController');

// Create a new custom field
router.post('/', customFieldController.createCustomField);

// Get all custom fields or by ID
router.get('/', customFieldController.getCustomFields);

// Update a custom field
router.put('/:id', customFieldController.updateCustomField);

// Delete a custom field
router.delete('/:id', customFieldController.deleteCustomField);

module.exports = router;
