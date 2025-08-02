const express = require('express');
const router = express.Router();
const classSectionTimeController = require('../controllers/classSectionTimeController');

// Batch create or update class section times
router.post('/batch', classSectionTimeController.batchUpsertClassSectionTimes);

// Get all class section times
router.get('/', classSectionTimeController.getClassSectionTimes);

// Get class section times by class_section_id
router.get('/section/:classSectionId', classSectionTimeController.getByClassSectionId);

// Delete a class section time
router.delete('/:id', classSectionTimeController.deleteClassSectionTime);

module.exports = router;
