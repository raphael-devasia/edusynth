const express = require('express');
const router = express.Router();
const examFeeController = require('../controllers/examFeeController');

// Create a new ExamFee
router.post('/', examFeeController.createExamFee);

// Get all ExamFees
router.get('/', examFeeController.getAllExamFees);

// Get ExamFee by ID
router.get('/:id', examFeeController.getExamFeeById);

// Update ExamFee
router.put('/:id', examFeeController.updateExamFee);

// Delete ExamFee
router.delete('/:id', examFeeController.deleteExamFee);

module.exports = router;
