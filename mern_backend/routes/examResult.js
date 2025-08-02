const express = require('express');
const router = express.Router();
const examResultController = require('../controllers/examResultController');

// Create a new exam result
router.post('/', examResultController.createExamResult);

// Get all exam results or by ID
router.get('/', examResultController.getExamResults);

// Update an exam result
router.put('/:id', examResultController.updateExamResult);

// Delete an exam result
router.delete('/:id', examResultController.deleteExamResult);

module.exports = router;
