const express = require('express');
const router = express.Router();
const staffTimelineController = require('../controllers/staffTimelineController');

// Create or update staff timeline
router.post('/', staffTimelineController.createOrUpdateStaffTimeline);

// Get staff timelines by staff_id (and optional status)
router.get('/', staffTimelineController.getStaffTimelines);

// Delete a staff timeline
router.delete('/:id', staffTimelineController.deleteStaffTimeline);

module.exports = router;
