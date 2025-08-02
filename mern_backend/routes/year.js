const express = require('express');
const router = express.Router();
const yearController = require('../controllers/yearController');

// Create a new year
router.post('/', yearController.createYear);

// Get all years
router.get('/', yearController.getAllYears);

// Get year by ID
router.get('/:id', yearController.getYearById);

// Update year
router.put('/:id', yearController.updateYear);

// Delete year
router.delete('/:id', yearController.deleteYear);

module.exports = router;
