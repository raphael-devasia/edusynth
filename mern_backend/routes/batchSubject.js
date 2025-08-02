const express = require('express');
const router = express.Router();
const batchSubjectController = require('../controllers/batchSubjectController');

// Create a new batch subject
router.post('/', batchSubjectController.createBatchSubject);

// Get all batch subjects
router.get('/', batchSubjectController.getBatchSubjects);

// Get a batch subject by ID
router.get('/:id', batchSubjectController.getBatchSubjectById);

// Update a batch subject
router.put('/:id', batchSubjectController.updateBatchSubject);

// Delete a batch subject
router.delete('/:id', batchSubjectController.deleteBatchSubject);

module.exports = router;
