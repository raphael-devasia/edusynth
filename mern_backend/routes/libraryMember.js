const express = require('express');
const router = express.Router();
const libraryMemberController = require('../controllers/libraryMemberController');

// Create a new library member
router.post('/', libraryMemberController.createLibraryMember);

// Get all library members or by ID
router.get('/', libraryMemberController.getLibraryMembers);

// Update a library member
router.put('/:id', libraryMemberController.updateLibraryMember);

// Delete a library member
router.delete('/:id', libraryMemberController.deleteLibraryMember);

module.exports = router;
