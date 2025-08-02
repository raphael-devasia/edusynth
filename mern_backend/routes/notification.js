const express = require('express');
const router = express.Router();
const notificationController = require('../controllers/notificationController');

// Create a new notification
router.post('/', notificationController.createNotification);

// Get all notifications or by ID
router.get('/', notificationController.getNotifications);

// Update a notification
router.put('/:id', notificationController.updateNotification);

// Delete a notification
router.delete('/:id', notificationController.deleteNotification);

module.exports = router;
