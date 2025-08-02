const express = require('express');
const router = express.Router();
const cmsProgramController = require('../controllers/cmsProgramController');

// Create a new CMS program
router.post('/', cmsProgramController.createCmsProgram);

// Get all CMS programs or by ID
router.get('/', cmsProgramController.getCmsPrograms);

// Get CMS programs by type (category)
router.get('/type/:type', cmsProgramController.getCmsProgramsByType);

// Update a CMS program
router.put('/:id', cmsProgramController.updateCmsProgram);

// Delete a CMS program
router.delete('/:id', cmsProgramController.deleteCmsProgram);

module.exports = router;
