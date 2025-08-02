const express = require('express');
const router = express.Router();
const homeworkController = require('../controllers/homeworkController');

// Create a new homework
router.post('/', homeworkController.createHomework);

// Get all homework
router.get('/', homeworkController.getHomeworks);

// Get a homework by ID
router.get('/:id', homeworkController.getHomeworkById);

// Update a homework
router.put('/:id', homeworkController.updateHomework);

// Delete a homework
router.delete('/:id', homeworkController.deleteHomework);

module.exports = router;
