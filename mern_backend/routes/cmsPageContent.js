const express = require('express');
const router = express.Router();
const cmsPageContentController = require('../controllers/cmsPageContentController');

// Create a new CMS page content
router.post('/', cmsPageContentController.createCmsPageContent);

// Get all CMS page contents or by ID
router.get('/', cmsPageContentController.getCmsPageContents);

// Get CMS page contents by page_id
router.get('/page/:page_id', cmsPageContentController.getCmsPageContentsByPage);

// Update a CMS page content
router.put('/:id', cmsPageContentController.updateCmsPageContent);

// Delete a CMS page content
router.delete('/:id', cmsPageContentController.deleteCmsPageContent);

module.exports = router;
