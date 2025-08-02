const express = require('express');
const router = express.Router();
const staffController = require('../controllers/staffController');

// Create staff
router.post('/', staffController.createStaff);
// Get all staff
router.get('/', staffController.getAllStaff);
// Get staff with birthdays today
router.get('/birthday', staffController.getBirthdayStaff);
// Get staff by ID
router.get('/:id', staffController.getStaffById);
// Update staff
router.put('/:id', staffController.updateStaff);
// Delete staff
router.delete('/:id', staffController.deleteStaff);

module.exports = router;
