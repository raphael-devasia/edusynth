const express = require('express');
const router = express.Router();
const classController = require('../controllers/classController');

// Create a new class
router.post('/', classController.createClass);

// Get all classes
router.get('/', classController.getClasses);

// Get a class by ID
router.get('/:id', classController.getClassById);

// Update a class
router.put('/:id', classController.updateClass);

// Delete a class
router.delete('/:id', classController.deleteClass);

module.exports = router;
