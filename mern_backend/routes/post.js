const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');

// Create a new Post
router.post('/', postController.createPost);

// Get all Posts
router.get('/', postController.getAllPosts);

// Get Post by ID
router.get('/:id', postController.getPostById);

// Update Post
router.put('/:id', postController.updatePost);

// Delete Post
router.delete('/:id', postController.deletePost);

module.exports = router;
