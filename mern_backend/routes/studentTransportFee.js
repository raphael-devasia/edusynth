const express = require('express');
const router = express.Router();
const studentTransportFeeController = require('../controllers/studentTransportFeeController');

// Create a new student transport fee
router.post('/', studentTransportFeeController.createStudentTransportFee);

// Get all student transport fees or by filter
router.get('/', studentTransportFeeController.getStudentTransportFees);

// Update a student transport fee
router.put('/:id', studentTransportFeeController.updateStudentTransportFee);

// Delete a student transport fee
router.delete('/:id', studentTransportFeeController.deleteStudentTransportFee);

module.exports = router;
