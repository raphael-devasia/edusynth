const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const complaintController = require('../controllers/complaintController');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../uploads/complaints'));
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
const upload = multer({ storage });

// Create a new complaint (with file upload)
router.post('/', upload.single('image'), complaintController.createComplaint);

// Download attached file for complaint
router.get('/download/:id', complaintController.downloadComplaintFile);

// Get complaint details (for modal)
router.get('/details/:id', complaintController.getComplaintDetails);

// Get all complaints or by ID
router.get('/', complaintController.getComplaints);

// Update a complaint (with file upload)
router.put('/:id', upload.single('image'), complaintController.updateComplaint);

// Delete a complaint
router.delete('/:id', complaintController.deleteComplaint);

module.exports = router;
