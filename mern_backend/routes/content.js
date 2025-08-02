const express = require('express');
const router = express.Router();
const contentController = require('../controllers/contentController');

// Create new content
router.post('/', contentController.createContent);

// Get all content or by ID
router.get('/', contentController.getContents);

// Get content by category
router.get('/category/:category', contentController.getContentsByCategory);

// Update content
router.put('/:id', contentController.updateContent);

// Delete content
router.delete('/:id', contentController.deleteContent);

module.exports = router;
