const express = require('express');
const router = express.Router();
const chatUserController = require('../controllers/chatUserController');

// Create a new chat user
router.post('/', chatUserController.createChatUser);

// Get all chat users
router.get('/', chatUserController.getChatUsers);

// Get a chat user by ID
router.get('/:id', chatUserController.getChatUserById);

// Update a chat user
router.put('/:id', chatUserController.updateChatUser);

// Delete a chat user
router.delete('/:id', chatUserController.deleteChatUser);

module.exports = router;
