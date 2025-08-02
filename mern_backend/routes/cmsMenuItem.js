const express = require('express');
const router = express.Router();
const cmsMenuItemController = require('../controllers/cmsMenuItemController');

// Create a new menu item
router.post('/', cmsMenuItemController.createCmsMenuItem);

// Get all menu items or by ID
router.get('/', cmsMenuItemController.getCmsMenuItems);

// Get menu item by slug
router.get('/slug/:slug', cmsMenuItemController.getCmsMenuItemBySlug);

// Update a menu item
router.put('/:id', cmsMenuItemController.updateCmsMenuItem);

// Delete a menu item
router.delete('/:id', cmsMenuItemController.deleteCmsMenuItem);

module.exports = router;
