const express = require('express');
const router = express.Router();
const contentTypeController = require('../controllers/contentTypeController');

// Create a new content type
router.post('/', contentTypeController.createContentType);

// Get all content types or by ID
router.get('/', contentTypeController.getContentTypes);

// Update a content type
router.put('/:id', contentTypeController.updateContentType);

// Delete a content type
router.delete('/:id', contentTypeController.deleteContentType);

module.exports = router;
