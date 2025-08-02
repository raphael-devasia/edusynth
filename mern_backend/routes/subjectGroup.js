const express = require('express');
const router = express.Router();
const subjectGroupController = require('../controllers/subjectGroupController');

// Create a new subject group
router.post('/', subjectGroupController.createSubjectGroup);

// Get all subject groups or by ID
router.get('/', subjectGroupController.getSubjectGroups);

// Update a subject group
router.put('/:id', subjectGroupController.updateSubjectGroup);

// Delete a subject group
router.delete('/:id', subjectGroupController.deleteSubjectGroup);

module.exports = router;
