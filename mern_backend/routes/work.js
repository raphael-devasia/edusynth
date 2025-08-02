const express = require('express');
const router = express.Router();
const workController = require('../controllers/workController');

// Create a new work
router.post('/', workController.createWork);

// Get all work
router.get('/', workController.getAllWork);

// Get work by ID
router.get('/:id', workController.getWorkById);

// Update work
router.put('/:id', workController.updateWork);

// Delete work
router.delete('/:id', workController.deleteWork);

module.exports = router;
