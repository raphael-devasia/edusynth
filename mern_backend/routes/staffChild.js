const express = require('express');
const router = express.Router();
const staffChildController = require('../controllers/staffChildController');

// Create a new staff child
router.post('/', staffChildController.createStaffChild);

// Get all staff children
router.get('/', staffChildController.getAllStaffChildren);

// Get staff child by ID
router.get('/:id', staffChildController.getStaffChildById);

// Update staff child
router.put('/:id', staffChildController.updateStaffChild);

// Delete staff child
router.delete('/:id', staffChildController.deleteStaffChild);

module.exports = router;
