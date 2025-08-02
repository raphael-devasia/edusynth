const express = require('express');
const router = express.Router();
const staffBankDetailsController = require('../controllers/staffBankDetailsController');

// Create a new staff bank details
router.post('/', staffBankDetailsController.createStaffBankDetails);

// Get all staff bank details
router.get('/', staffBankDetailsController.getAllStaffBankDetails);

// Get staff bank details by ID
router.get('/:id', staffBankDetailsController.getStaffBankDetailsById);

// Update staff bank details
router.put('/:id', staffBankDetailsController.updateStaffBankDetails);

// Delete staff bank details
router.delete('/:id', staffBankDetailsController.deleteStaffBankDetails);

module.exports = router;
