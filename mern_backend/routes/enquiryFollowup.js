const express = require('express');
const router = express.Router();
const enquiryFollowupController = require('../controllers/enquiryFollowupController');

// Create a new EnquiryFollowup
router.post('/', enquiryFollowupController.createEnquiryFollowup);

// Get all EnquiryFollowups
router.get('/', enquiryFollowupController.getAllEnquiryFollowups);

// Get EnquiryFollowup by ID
router.get('/:id', enquiryFollowupController.getEnquiryFollowupById);

// Update EnquiryFollowup
router.put('/:id', enquiryFollowupController.updateEnquiryFollowup);

// Delete EnquiryFollowup
router.delete('/:id', enquiryFollowupController.deleteEnquiryFollowup);

module.exports = router;
