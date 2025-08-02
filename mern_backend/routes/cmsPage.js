const express = require('express');
const router = express.Router();
const cmsPageController = require('../controllers/cmsPageController');

// Create a new CMS page
router.post('/', cmsPageController.createCmsPage);

// Get all CMS pages or by ID
router.get('/', cmsPageController.getCmsPages);

// Get CMS page by slug
router.get('/slug/:slug', cmsPageController.getCmsPageBySlug);

// Update a CMS page
router.put('/:id', cmsPageController.updateCmsPage);

// Delete a CMS page
router.delete('/:id', cmsPageController.deleteCmsPage);

module.exports = router;
