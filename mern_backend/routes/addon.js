const express = require('express');
const router = express.Router();
const addonController = require('../controllers/addonController');

// Create a new addon
router.post('/', addonController.createAddon);

// Get all addons
router.get('/', addonController.getAddons);

// Get an addon by ID
router.get('/:id', addonController.getAddonById);

// Update an addon
router.put('/:id', addonController.updateAddon);

// Delete an addon
router.delete('/:id', addonController.deleteAddon);

module.exports = router;
