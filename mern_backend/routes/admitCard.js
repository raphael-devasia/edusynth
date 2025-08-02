const express = require('express');
const router = express.Router();
const admitCardController = require('../controllers/admitCardController');

// Create a new admit card template
router.post('/', admitCardController.createAdmitCard);

// Get all admit card templates
router.get('/', admitCardController.getAdmitCards);

// Get an admit card template by ID
router.get('/:id', admitCardController.getAdmitCardById);

// Update an admit card template
router.put('/:id', admitCardController.updateAdmitCard);

// Delete an admit card template
router.delete('/:id', admitCardController.deleteAdmitCard);

module.exports = router;
