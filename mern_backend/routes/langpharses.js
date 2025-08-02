const express = require('express');
const router = express.Router();
const langpharsesController = require('../controllers/langpharsesController');

// Create or update a language phrase
router.post('/', langpharsesController.createOrUpdateLangpharses);

// Get all language phrases
router.get('/', langpharsesController.getAllLangpharses);

// Get language phrases by language ID
router.get('/lang/:lang_id', langpharsesController.getLangpharsesByLang);

// Get language phrase by ID
router.get('/:id', langpharsesController.getLangpharsesById);

// Delete language phrase by ID
router.delete('/:id', langpharsesController.deleteLangpharses);

// Delete all phrases for a specific language
router.delete('/lang/:lang_id', langpharsesController.deletePhrasesByLang);

module.exports = router;
