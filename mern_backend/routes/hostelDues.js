const express = require('express');
const router = express.Router();
const hostelDuesController = require('../controllers/hostelDuesController');

// Create a new HostelDues
router.post('/', hostelDuesController.createHostelDues);

// Get all HostelDues
router.get('/', hostelDuesController.getAllHostelDues);

// Get HostelDues by ID
router.get('/:id', hostelDuesController.getHostelDuesById);

// Update HostelDues
router.put('/:id', hostelDuesController.updateHostelDues);

// Delete HostelDues
router.delete('/:id', hostelDuesController.deleteHostelDues);

module.exports = router;
