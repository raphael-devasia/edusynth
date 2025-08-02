const express = require('express');
const router = express.Router();
const staffCertificateController = require('../controllers/staffCertificateController');

// Create a new staff certificate
router.post('/', staffCertificateController.createStaffCertificate);

// Get all staff certificates
router.get('/', staffCertificateController.getAllStaffCertificates);

// Get staff certificate by ID
router.get('/:id', staffCertificateController.getStaffCertificateById);

// Update staff certificate
router.put('/:id', staffCertificateController.updateStaffCertificate);

// Delete staff certificate
router.delete('/:id', staffCertificateController.deleteStaffCertificate);

module.exports = router;
