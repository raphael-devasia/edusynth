const express = require('express');
const router = express.Router();
const bookIssueController = require('../controllers/bookIssueController');

// Create a new book issue
router.post('/', bookIssueController.createBookIssue);

// Get all book issues
router.get('/', bookIssueController.getBookIssues);

// Get a book issue by ID
router.get('/:id', bookIssueController.getBookIssueById);

// Update a book issue
router.put('/:id', bookIssueController.updateBookIssue);

// Delete a book issue
router.delete('/:id', bookIssueController.deleteBookIssue);

module.exports = router;
