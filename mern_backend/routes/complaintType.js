const express = require('express');
const router = express.Router();
const complaintTypeController = require('../controllers/complaintTypeController');

// Create a new complaint type
router.post('/', complaintTypeController.createComplaintType);

// Get all complaint types or by ID
router.get('/', complaintTypeController.getComplaintTypes);

// Update a complaint type
router.put('/:id', complaintTypeController.updateComplaintType);

// Delete a complaint type
router.delete('/:id', complaintTypeController.deleteComplaintType);

module.exports = router;
