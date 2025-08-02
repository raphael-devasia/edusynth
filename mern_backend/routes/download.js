const express = require('express');
const router = express.Router();
const downloadController = require('../controllers/downloadController');

// Create a new download
router.post('/', downloadController.createDownload);

// Get all downloads
router.get('/', downloadController.getAllDownloads);

// Get download by ID
router.get('/:id', downloadController.getDownloadById);

// Update download
router.put('/:id', downloadController.updateDownload);

// Delete download
router.delete('/:id', downloadController.deleteDownload);

module.exports = router;
