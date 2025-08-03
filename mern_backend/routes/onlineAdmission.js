const express = require('express');
const router = express.Router();
const controller = require('../controllers/onlineAdmissionController');

// Admin routes
router.get('/', controller.getAll); // List all admissions
router.get('/:id', controller.getOne); // Get single admission
router.put('/:id', controller.update); // Update (approve/reject)
router.delete('/:id', controller.delete); // Delete

// Public route
router.post('/submit', controller.submit); // Submit new application

module.exports = router;
