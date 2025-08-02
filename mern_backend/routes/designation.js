const express = require('express');
const router = express.Router();
const designationController = require('../controllers/designationController');

// Create a new designation
router.post('/', designationController.createDesignation);

// Get all designations or by ID
router.get('/', designationController.getDesignations);

// Update a designation
router.put('/:id', designationController.updateDesignation);

// Delete a designation
router.delete('/:id', designationController.deleteDesignation);

module.exports = router;
