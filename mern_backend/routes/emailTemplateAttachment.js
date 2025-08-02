const express = require('express');
const router = express.Router();
const emailTemplateAttachmentController = require('../controllers/emailTemplateAttachmentController');

// Create a new email template attachment
router.post('/', emailTemplateAttachmentController.createEmailTemplateAttachment);
// Get all email template attachments (optionally filter by email_template_id)
router.get('/', emailTemplateAttachmentController.getEmailTemplateAttachments);
// Get a single email template attachment by ID
router.get('/:id', emailTemplateAttachmentController.getEmailTemplateAttachmentById);
// Update an email template attachment
router.put('/:id', emailTemplateAttachmentController.updateEmailTemplateAttachment);
// Delete an email template attachment
router.delete('/:id', emailTemplateAttachmentController.deleteEmailTemplateAttachment);

module.exports = router;
