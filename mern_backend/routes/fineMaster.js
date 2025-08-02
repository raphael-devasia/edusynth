const express = require('express');
const router = express.Router();
const fineMasterController = require('../controllers/fineMasterController');

// Create a new FineMaster
router.post('/', fineMasterController.createFineMaster);

// Get all FineMasters
router.get('/', fineMasterController.getAllFineMasters);

// Get FineMaster by ID
router.get('/:id', fineMasterController.getFineMasterById);

// Update FineMaster
router.put('/:id', fineMasterController.updateFineMaster);

// Delete FineMaster
router.delete('/:id', fineMasterController.deleteFineMaster);

module.exports = router;
