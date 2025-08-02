const express = require('express');
const router = express.Router();
const subjectGroupSubjectController = require('../controllers/subjectGroupSubjectController');

// Create a new subject group subject
router.post('/', subjectGroupSubjectController.createSubjectGroupSubject);

// Get all subject group subjects
router.get('/', subjectGroupSubjectController.getAllSubjectGroupSubjects);

// Get a single subject group subject by ID
router.get('/:id', subjectGroupSubjectController.getSubjectGroupSubjectById);

// Update a subject group subject
router.put('/:id', subjectGroupSubjectController.updateSubjectGroupSubject);

// Delete a subject group subject
router.delete('/:id', subjectGroupSubjectController.deleteSubjectGroupSubject);

module.exports = router;
