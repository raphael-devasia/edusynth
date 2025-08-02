const express = require('express');
const router = express.Router();
const notificationSettingController = require('../controllers/notificationSettingController');

// Create a new notification setting
router.post('/', notificationSettingController.createNotificationSetting);

// Get all notification settings
router.get('/', notificationSettingController.getAllNotificationSettings);

// Get a notification setting by ID
router.get('/:id', notificationSettingController.getNotificationSettingById);

// Update a notification setting
router.put('/:id', notificationSettingController.updateNotificationSetting);

// Delete a notification setting
router.delete('/:id', notificationSettingController.deleteNotificationSetting);

module.exports = router;
