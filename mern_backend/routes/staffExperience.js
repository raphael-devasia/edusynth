const express = require('express');
const router = express.Router();
const staffExperienceController = require('../controllers/staffExperienceController');

// Create a new staff experience
router.post('/', staffExperienceController.createStaffExperience);

// Get all staff experiences
router.get('/', staffExperienceController.getAllStaffExperiences);

// Get staff experience by ID
router.get('/:id', staffExperienceController.getStaffExperienceById);

// Update staff experience
router.put('/:id', staffExperienceController.updateStaffExperience);

// Delete staff experience
router.delete('/:id', staffExperienceController.deleteStaffExperience);

module.exports = router;
