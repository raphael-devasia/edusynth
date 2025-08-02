const express = require('express');
const router = express.Router();
const dueFeeController = require('../controllers/dueFeeController');

// Create a new DueFee
router.post('/', dueFeeController.createDueFee);

// Get all DueFees
router.get('/', dueFeeController.getAllDueFees);

// Get DueFee by ID
router.get('/:id', dueFeeController.getDueFeeById);

// Update DueFee
router.put('/:id', dueFeeController.updateDueFee);

// Delete DueFee
router.delete('/:id', dueFeeController.deleteDueFee);

module.exports = router;
