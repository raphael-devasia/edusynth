const express = require('express');
const router = express.Router();
const studentCertificateController = require('../controllers/studentCertificateController');

// Create a new student certificate
router.post('/', studentCertificateController.createStudentCertificate);

// Get all student certificates
router.get('/', studentCertificateController.getAllStudentCertificates);

// Get student certificate by ID
router.get('/:id', studentCertificateController.getStudentCertificateById);

// Update student certificate
router.put('/:id', studentCertificateController.updateStudentCertificate);

// Delete student certificate
router.delete('/:id', studentCertificateController.deleteStudentCertificate);

module.exports = router;
