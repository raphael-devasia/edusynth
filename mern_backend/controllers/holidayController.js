const Holiday = require('../models/Holiday');

// Create a new Holiday
exports.createHoliday = async (req, res) => {
  try {
    const holiday = new Holiday(req.body);
    await holiday.save();
    res.status(201).json(holiday);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all Holidays
exports.getAllHolidays = async (req, res) => {
  try {
    const holidays = await Holiday.find();
    res.json(holidays);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get Holiday by ID
exports.getHolidayById = async (req, res) => {
  try {
    const holiday = await Holiday.findById(req.params.id);
    if (!holiday) return res.status(404).json({ error: 'Holiday not found' });
    res.json(holiday);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update Holiday
exports.updateHoliday = async (req, res) => {
  try {
    const holiday = await Holiday.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!holiday) return res.status(404).json({ error: 'Holiday not found' });
    res.json(holiday);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete Holiday
exports.deleteHoliday = async (req, res) => {
  try {
    const holiday = await Holiday.findByIdAndDelete(req.params.id);
    if (!holiday) return res.status(404).json({ error: 'Holiday not found' });
    res.json({ message: 'Holiday deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
