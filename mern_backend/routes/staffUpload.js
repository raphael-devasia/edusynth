const express = require('express');
const router = express.Router();
const staffUploadController = require('../controllers/staffUploadController');

// Create a new staff upload
router.post('/', staffUploadController.createStaffUpload);

// Get all staff uploads
router.get('/', staffUploadController.getAllStaffUploads);

// Get staff upload by ID
router.get('/:id', staffUploadController.getStaffUploadById);

// Update staff upload
router.put('/:id', staffUploadController.updateStaffUpload);

// Delete staff upload
router.delete('/:id', staffUploadController.deleteStaffUpload);

module.exports = router;
