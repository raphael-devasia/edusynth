const express = require('express');
const router = express.Router();
const staffContactController = require('../controllers/staffContactController');

// Create a new staff contact
router.post('/', staffContactController.createStaffContact);

// Get all staff contacts
router.get('/', staffContactController.getAllStaffContacts);

// Get staff contact by ID
router.get('/:id', staffContactController.getStaffContactById);

// Update staff contact
router.put('/:id', staffContactController.updateStaffContact);

// Delete staff contact
router.delete('/:id', staffContactController.deleteStaffContact);

module.exports = router;
