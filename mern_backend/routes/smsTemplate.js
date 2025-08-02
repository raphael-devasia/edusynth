const express = require('express');
const router = express.Router();
const smsTemplateController = require('../controllers/smsTemplateController');

// Create a new SMS template
router.post('/', smsTemplateController.createSmsTemplate);
// Get all SMS templates
router.get('/', smsTemplateController.getSmsTemplates);
// Get a single SMS template by ID
router.get('/:id', smsTemplateController.getSmsTemplateById);
// Update an SMS template
router.put('/:id', smsTemplateController.updateSmsTemplate);
// Delete an SMS template
router.delete('/:id', smsTemplateController.deleteSmsTemplate);

module.exports = router;
