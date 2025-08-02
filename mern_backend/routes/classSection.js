const express = require('express');
const router = express.Router();
const classSectionController = require('../controllers/classSectionController');

// Create a new class section
router.post('/', classSectionController.createClassSection);

// Get all class sections for a class
router.get('/class/:classId', classSectionController.getClassSectionsByClass);

// Update a class section
router.put('/:id', classSectionController.updateClassSection);

// Delete a class section
router.delete('/:id', classSectionController.deleteClassSection);

module.exports = router;
