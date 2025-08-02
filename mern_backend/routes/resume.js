const express = require('express');
const router = express.Router();
const resumeController = require('../controllers/resumeController');

// Create a new resume
router.post('/', resumeController.createResume);

// Get all resumes
router.get('/', resumeController.getAllResumes);

// Get a resume by ID
router.get('/:id', resumeController.getResumeById);

// Update a resume
router.put('/:id', resumeController.updateResume);

// Delete a resume
router.delete('/:id', resumeController.deleteResume);

module.exports = router;
