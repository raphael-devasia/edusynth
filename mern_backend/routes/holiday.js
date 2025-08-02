const express = require('express');
const router = express.Router();
const holidayController = require('../controllers/holidayController');

// Create a new Holiday
router.post('/', holidayController.createHoliday);

// Get all Holidays
router.get('/', holidayController.getAllHolidays);

// Get Holiday by ID
router.get('/:id', holidayController.getHolidayById);

// Update Holiday
router.put('/:id', holidayController.updateHoliday);

// Delete Holiday
router.delete('/:id', holidayController.deleteHoliday);

module.exports = router;
