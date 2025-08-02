const express = require('express');
const router = express.Router();
const examScheduleController = require('../controllers/examScheduleController');

// Create a new exam schedule
router.post('/', examScheduleController.createExamSchedule);

// Get all exam schedules or by filter
router.get('/', examScheduleController.getExamSchedules);

// Update an exam schedule
router.put('/:id', examScheduleController.updateExamSchedule);

// Delete an exam schedule
router.delete('/:id', examScheduleController.deleteExamSchedule);

module.exports = router;
