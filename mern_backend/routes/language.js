const express = require('express');
const router = express.Router();
const languageController = require('../controllers/languageController');

// Create or update a language
router.post('/', languageController.createOrUpdateLanguage);

// Get all languages with pagination
router.get('/paginated', languageController.getAllLanguages);

// Get all languages (simple list)
router.get('/', languageController.getLanguages);

// Get enabled languages
router.get('/enabled', languageController.getEnabledLanguages);

// Get default language
router.get('/default', languageController.getDefaultLanguage);

// Check if language exists
router.post('/check-exists', languageController.checkLanguageExists);

// Get language by ID
router.get('/:id', languageController.getLanguageById);

// Set default language
router.patch('/:id/set-default', languageController.setDefaultLanguage);

// Toggle language status
router.patch('/:id/toggle', languageController.toggleLanguageStatus);

// Delete language by ID
router.delete('/:id', languageController.deleteLanguage);

module.exports = router;
