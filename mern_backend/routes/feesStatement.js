const express = require('express');
const router = express.Router();
const feesStatementController = require('../controllers/feesStatementController');

// Create a new FeesStatement
router.post('/', feesStatementController.createFeesStatement);

// Get all FeesStatements
router.get('/', feesStatementController.getAllFeesStatements);

// Get FeesStatement by ID
router.get('/:id', feesStatementController.getFeesStatementById);

// Update FeesStatement
router.put('/:id', feesStatementController.updateFeesStatement);

// Delete FeesStatement
router.delete('/:id', feesStatementController.deleteFeesStatement);

module.exports = router;
