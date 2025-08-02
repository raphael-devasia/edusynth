const express = require('express');
const router = express.Router();
const staffFeedbackController = require('../controllers/staffFeedbackController');

// Get all feedback for a staff member
router.get('/', staffFeedbackController.getAllFeedback);

// Create feedback
router.post('/', staffFeedbackController.createFeedback);

// Delete feedback
router.delete('/:id', staffFeedbackController.deleteFeedback);

module.exports = router;
