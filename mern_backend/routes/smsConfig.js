const express = require('express');
const router = express.Router();
const smsConfigController = require('../controllers/smsConfigController');

// Create a new SMS config
router.post('/', smsConfigController.createSmsConfig);

// Get all SMS configs
router.get('/', smsConfigController.getAllSmsConfigs);

// Get an SMS config by ID
router.get('/:id', smsConfigController.getSmsConfigById);

// Update an SMS config
router.put('/:id', smsConfigController.updateSmsConfig);

// Delete an SMS config
router.delete('/:id', smsConfigController.deleteSmsConfig);

module.exports = router;
