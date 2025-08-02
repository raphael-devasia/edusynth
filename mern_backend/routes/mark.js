const express = require('express');
const router = express.Router();
const markController = require('../controllers/markController');

// Create a new mark
router.post('/', markController.createMark);

// Get all marks or by ID
router.get('/', markController.getMarks);

// Update a mark
router.put('/:id', markController.updateMark);

// Delete a mark
router.delete('/:id', markController.deleteMark);

module.exports = router;
