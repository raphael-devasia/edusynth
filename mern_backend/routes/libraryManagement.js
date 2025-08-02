const express = require('express');
const router = express.Router();
const libraryManagementController = require('../controllers/libraryManagementController');

// Create a new library member
router.post('/', libraryManagementController.createLibraryMember);

// Get all library members or by ID
router.get('/', libraryManagementController.getLibraryMembers);

// Update a library member
router.put('/:id', libraryManagementController.updateLibraryMember);

// Delete a library member
router.delete('/:id', libraryManagementController.deleteLibraryMember);

module.exports = router;
