const express = require('express');
const router = express.Router();
const referenceController = require('../controllers/referenceController');

// Create a new reference
router.post('/', referenceController.createReference);

// Get all references
router.get('/', referenceController.getAllReferences);

// Get a reference by ID
router.get('/:id', referenceController.getReferenceById);

// Update a reference
router.put('/:id', referenceController.updateReference);

// Delete a reference
router.delete('/:id', referenceController.deleteReference);

module.exports = router;
