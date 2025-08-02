const express = require('express');
const router = express.Router();
const admissionEnquiryController = require('../controllers/admissionEnquiryController');

// GET all enquiries
router.get('/', admissionEnquiryController.getAllEnquiries);

// GET single enquiry by ID
router.get('/:id', admissionEnquiryController.getEnquiryById);

// POST create new enquiry
router.post('/', admissionEnquiryController.createEnquiry);

// PUT update enquiry
router.put('/:id', admissionEnquiryController.updateEnquiry);

// DELETE enquiry
router.delete('/:id', admissionEnquiryController.deleteEnquiry);

module.exports = router;
