const express = require('express');
const router = express.Router();
const cmsMediaController = require('../controllers/cmsMediaController');

// Bulk add media
router.post('/bulk', cmsMediaController.bulkAddCmsMedia);

// Add a single media
router.post('/', cmsMediaController.createCmsMedia);

// Get all media or by ID
router.get('/', cmsMediaController.getCmsMedia);

// Get media by slug (img_name)
router.get('/slug/:slug', cmsMediaController.getCmsMediaBySlug);

// Update a media
router.put('/:id', cmsMediaController.updateCmsMedia);

// Delete a media
router.delete('/:id', cmsMediaController.deleteCmsMedia);

module.exports = router;
