const express = require('express');
const router = express.Router();
const calendarController = require('../controllers/calendarController');

// Create a new calendar event
router.post('/', calendarController.createCalendar);

// Get all calendar events
router.get('/', calendarController.getCalendars);

// Get a calendar event by ID
router.get('/:id', calendarController.getCalendarById);

// Update a calendar event
router.put('/:id', calendarController.updateCalendar);

// Delete a calendar event
router.delete('/:id', calendarController.deleteCalendar);

module.exports = router;
