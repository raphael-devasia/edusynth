const express = require('express');
const router = express.Router();
const feesStructureController = require('../controllers/feesStructureController');

// Create a new FeesStructure
router.post('/', feesStructureController.createFeesStructure);

// Get all FeesStructures
router.get('/', feesStructureController.getAllFeesStructures);

// Get FeesStructure by ID
router.get('/:id', feesStructureController.getFeesStructureById);

// Update FeesStructure
router.put('/:id', feesStructureController.updateFeesStructure);

// Delete FeesStructure
router.delete('/:id', feesStructureController.deleteFeesStructure);

module.exports = router;
