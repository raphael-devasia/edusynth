const express = require('express');
const router = express.Router();
const feeMasterController = require('../controllers/feeMasterController');

// Create a new fee master
router.post('/', feeMasterController.createFeeMaster);

// Get all fee masters or by ID
router.get('/', feeMasterController.getFeeMasters);

// Update a fee master
router.put('/:id', feeMasterController.updateFeeMaster);

// Delete a fee master
router.delete('/:id', feeMasterController.deleteFeeMaster);

module.exports = router;
