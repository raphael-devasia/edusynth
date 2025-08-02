const express = require('express');
const router = express.Router();
const cmsMenuController = require('../controllers/cmsMenuController');

// Create a new menu
router.post('/', cmsMenuController.createCmsMenu);

// Get all menus or by ID
router.get('/', cmsMenuController.getCmsMenus);

// Get menu by slug
router.get('/slug/:slug', cmsMenuController.getCmsMenuBySlug);

// Update a menu
router.put('/:id', cmsMenuController.updateCmsMenu);

// Delete a menu
router.delete('/:id', cmsMenuController.deleteCmsMenu);

module.exports = router;
