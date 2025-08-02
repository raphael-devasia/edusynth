const express = require('express');
const router = express.Router();
const subjectSyllabusController = require('../controllers/subjectSyllabusController');

// Create a new subject syllabus
router.post('/', subjectSyllabusController.createSubjectSyllabus);

// Get all subject syllabi
router.get('/', subjectSyllabusController.getAllSubjectSyllabi);

// Get a single subject syllabus by ID
router.get('/:id', subjectSyllabusController.getSubjectSyllabusById);

// Update a subject syllabus
router.put('/:id', subjectSyllabusController.updateSubjectSyllabus);

// Delete a subject syllabus
router.delete('/:id', subjectSyllabusController.deleteSubjectSyllabus);

module.exports = router;
