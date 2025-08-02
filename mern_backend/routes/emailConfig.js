const express = require('express');
const router = express.Router();
const emailConfigController = require('../controllers/emailConfigController');

// Create or update email config
router.post('/', emailConfigController.createOrUpdateEmailConfig);

// Get all email configs
router.get('/', emailConfigController.getEmailConfigs);

// Get email config by type
router.get('/:type', emailConfigController.getEmailConfigByType);

module.exports = router;
