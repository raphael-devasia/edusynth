const express = require('express');
const router = express.Router();
const idCardController = require('../controllers/idCardController');

// Create or update an ID card template
router.post('/', idCardController.createOrUpdateIdCard);

// Get all ID card templates
router.get('/', idCardController.getAllIdCards);

// Get active ID card templates
router.get('/active', idCardController.getActiveIdCards);

// Get ID card template by ID
router.get('/:id', idCardController.getIdCardById);

// Toggle ID card template status
router.patch('/:id/toggle', idCardController.toggleIdCardStatus);

// Delete ID card template by ID
router.delete('/:id', idCardController.deleteIdCard);

module.exports = router;
