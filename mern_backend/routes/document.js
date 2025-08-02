const express = require('express');
const router = express.Router();
const documentController = require('../controllers/documentController');

// Create a new document
router.post('/', documentController.createDocument);

// Get all documents
router.get('/', documentController.getAllDocuments);

// Get document by ID
router.get('/:id', documentController.getDocumentById);

// Update document
router.put('/:id', documentController.updateDocument);

// Delete document
router.delete('/:id', documentController.deleteDocument);

module.exports = router;
