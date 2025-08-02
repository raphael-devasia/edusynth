const express = require('express');
const router = express.Router();
const studentTimelineController = require('../controllers/studentTimelineController');

// Create or update student timeline
router.post('/', studentTimelineController.createOrUpdateStudentTimeline);

// Get student timelines by student_id (and optional status)
router.get('/', studentTimelineController.getStudentTimelines);

// Delete a student timeline
router.delete('/:id', studentTimelineController.deleteStudentTimeline);

module.exports = router;
