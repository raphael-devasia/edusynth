const express = require('express');
const router = express.Router();
const syllabusController = require('../controllers/syllabusController');

// Create a new syllabus
router.post('/', syllabusController.createSyllabus);

// Get all syllabi or by ID
router.get('/', syllabusController.getSyllabi);

// Update a syllabus
router.put('/:id', syllabusController.updateSyllabus);

// Delete a syllabus
router.delete('/:id', syllabusController.deleteSyllabus);

module.exports = router;
