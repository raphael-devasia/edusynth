const express = require('express');
const router = express.Router();
const photoController = require('../controllers/photoController');

// Create a new Photo
router.post('/', photoController.createPhoto);

// Get all Photos
router.get('/', photoController.getAllPhotos);

// Get Photo by ID
router.get('/:id', photoController.getPhotoById);

// Update Photo
router.put('/:id', photoController.updatePhoto);

// Delete Photo
router.delete('/:id', photoController.deletePhoto);

module.exports = router;
