const express = require('express');
const router = express.Router();
const studentFeeController = require('../controllers/studentFeeController');

// Create a new student fee
router.post('/', studentFeeController.createStudentFee);

// Get all student fees
router.get('/', studentFeeController.getStudentFees);

// Get a student fee by ID
router.get('/:id', studentFeeController.getStudentFeeById);

// Update a student fee
router.put('/:id', studentFeeController.updateStudentFee);

// Delete a student fee
router.delete('/:id', studentFeeController.deleteStudentFee);

module.exports = router;
