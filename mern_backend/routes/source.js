const express = require('express');
const router = express.Router();
const sourceController = require('../controllers/sourceController');

// Create a new source
router.post('/', sourceController.createSource);
// Get all sources
router.get('/', sourceController.getSources);
// Get a single source by ID
router.get('/:id', sourceController.getSourceById);
// Update a source
router.put('/:id', sourceController.updateSource);
// Delete a source
router.delete('/:id', sourceController.deleteSource);

module.exports = router;
