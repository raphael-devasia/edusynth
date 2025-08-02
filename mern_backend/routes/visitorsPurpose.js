const express = require('express');
const router = express.Router();
const visitorsPurposeController = require('../controllers/visitorsPurposeController');

// Create purpose
router.post('/', visitorsPurposeController.createPurpose);
// Get all purposes
router.get('/', visitorsPurposeController.getAllPurposes);
// Get purpose by ID
router.get('/:id', visitorsPurposeController.getPurposeById);
// Update purpose
router.put('/:id', visitorsPurposeController.updatePurpose);
// Delete purpose
router.delete('/:id', visitorsPurposeController.deletePurpose);

module.exports = router;
