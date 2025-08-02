const express = require('express');
const router = express.Router();
const chatController = require('../controllers/chatController');

// Create a new chat message
router.post('/', chatController.createChat);

// Get all chat messages between two users
router.get('/', chatController.getChat);

// Mark messages as seen
router.post('/seen', chatController.markSeen);

module.exports = router;
