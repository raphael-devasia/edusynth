const express = require('express');
const router = express.Router();
const alumniController = require('../controllers/alumniController');

// Create a new alumni record
router.post('/', alumniController.createAlumni);

// Get all alumni records
router.get('/', alumniController.getAlumnis);

// Get an alumni record by ID
router.get('/:id', alumniController.getAlumniById);

// Update an alumni record
router.put('/:id', alumniController.updateAlumni);

// Delete an alumni record
router.delete('/:id', alumniController.deleteAlumni);

module.exports = router;
