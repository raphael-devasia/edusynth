const express = require('express');
const router = express.Router();
const settingController = require('../controllers/settingController');

// Create or update setting
router.post('/', settingController.createOrUpdateSetting);

// Get current setting
router.get('/', settingController.getSetting);

module.exports = router;
