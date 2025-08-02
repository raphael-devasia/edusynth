const express = require('express');
const router = express.Router();
const sectionController = require('../controllers/sectionController');

// Create a new section
router.post('/', sectionController.createSection);

// Get all sections
router.get('/', sectionController.getSections);

// Get a section by ID
router.get('/:id', sectionController.getSectionById);

// Update a section
router.put('/:id', sectionController.updateSection);

// Delete a section
router.delete('/:id', sectionController.deleteSection);

module.exports = router;
