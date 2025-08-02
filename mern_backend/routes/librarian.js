const express = require('express');
const router = express.Router();
const librarianController = require('../controllers/librarianController');

// Create a new librarian
router.post('/', librarianController.createLibrarian);

// Get all librarians or by ID
router.get('/', librarianController.getLibrarians);

// Update a librarian
router.put('/:id', librarianController.updateLibrarian);

// Delete a librarian
router.delete('/:id', librarianController.deleteLibrarian);

module.exports = router;
