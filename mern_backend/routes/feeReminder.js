const express = require('express');
const router = express.Router();
const feeReminderController = require('../controllers/feeReminderController');

// Create or update a fee reminder by type
router.post('/', feeReminderController.createOrUpdateFeeReminder);

// Get all fee reminders or by ID
router.get('/', feeReminderController.getFeeReminders);

// Delete a fee reminder
router.delete('/:id', feeReminderController.deleteFeeReminder);

module.exports = router;
