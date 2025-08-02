const express = require('express');
const router = express.Router();
const disableReasonController = require('../controllers/disableReasonController');

// Create a new disable reason
router.post('/', disableReasonController.createDisableReason);

// Get all disable reasons or by ID
router.get('/', disableReasonController.getDisableReasons);

// Update a disable reason
router.put('/:id', disableReasonController.updateDisableReason);

// Delete a disable reason
router.delete('/:id', disableReasonController.deleteDisableReason);

module.exports = router;
