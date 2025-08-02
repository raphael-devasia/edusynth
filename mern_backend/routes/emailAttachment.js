const express = require('express');
const router = express.Router();
const emailAttachmentController = require('../controllers/emailAttachmentController');

// Create a new email attachment
router.post('/', emailAttachmentController.createEmailAttachment);
// Get all email attachments (optionally filter by message_id)
router.get('/', emailAttachmentController.getEmailAttachments);
// Get a single email attachment by ID
router.get('/:id', emailAttachmentController.getEmailAttachmentById);
// Update an email attachment
router.put('/:id', emailAttachmentController.updateEmailAttachment);
// Delete an email attachment
router.delete('/:id', emailAttachmentController.deleteEmailAttachment);

module.exports = router;
