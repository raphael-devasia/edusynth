const express = require('express');
const router = express.Router();
const marksDivisionController = require('../controllers/marksDivisionController');

// Create a new marks division
router.post('/', marksDivisionController.createMarksDivision);

// Get all marks divisions or by ID
router.get('/', marksDivisionController.getMarksDivisions);

// Update a marks division
router.put('/:id', marksDivisionController.updateMarksDivision);

// Delete a marks division
router.delete('/:id', marksDivisionController.deleteMarksDivision);

module.exports = router;
