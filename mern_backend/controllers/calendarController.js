const Calendar = require('../models/Calendar');

// Create a new calendar event
exports.createCalendar = async (req, res) => {
  try {
    const calendar = new Calendar(req.body);
    await calendar.save();
    res.status(201).json(calendar);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all calendar events
exports.getCalendars = async (req, res) => {
  try {
    const calendars = await Calendar.find();
    res.json(calendars);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get a calendar event by ID
exports.getCalendarById = async (req, res) => {
  try {
    const calendar = await Calendar.findById(req.params.id);
    if (!calendar) return res.status(404).json({ error: 'Calendar event not found' });
    res.json(calendar);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update a calendar event
exports.updateCalendar = async (req, res) => {
  try {
    const calendar = await Calendar.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!calendar) return res.status(404).json({ error: 'Calendar event not found' });
    res.json(calendar);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete a calendar event
exports.deleteCalendar = async (req, res) => {
  try {
    const calendar = await Calendar.findByIdAndDelete(req.params.id);
    if (!calendar) return res.status(404).json({ error: 'Calendar event not found' });
    res.json({ message: 'Calendar event deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
