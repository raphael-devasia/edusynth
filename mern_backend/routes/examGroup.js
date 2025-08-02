const express = require('express');
const router = express.Router();
const examGroupController = require('../controllers/examGroupController');

// Create a new exam group
router.post('/', examGroupController.createExamGroup);

// Get all exam groups or by ID
router.get('/', examGroupController.getExamGroups);

// Update an exam group
router.put('/:id', examGroupController.updateExamGroup);

// Delete an exam group
router.delete('/:id', examGroupController.deleteExamGroup);

module.exports = router;
