const express = require('express');
const router = express.Router();
const marksheetController = require('../controllers/marksheetController');

// Create a new marksheet template
router.post('/', marksheetController.createMarksheet);

// Get all marksheet templates
router.get('/', marksheetController.getMarksheets);

// Get a marksheet template by ID
router.get('/:id', marksheetController.getMarksheetById);

// Update a marksheet template
router.put('/:id', marksheetController.updateMarksheet);

// Delete a marksheet template
router.delete('/:id', marksheetController.deleteMarksheet);

module.exports = router;
