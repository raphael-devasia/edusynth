const express = require('express');
const router = express.Router();
const itemIssueController = require('../controllers/itemIssueController');

// Create a new item issue
router.post('/', itemIssueController.createItemIssue);

// Get all item issues or by ID
router.get('/', itemIssueController.getItemIssues);

// Update an item issue
router.put('/:id', itemIssueController.updateItemIssue);

// Delete an item issue
router.delete('/:id', itemIssueController.deleteItemIssue);

module.exports = router;
