const express = require('express');
const router = express.Router();
const filetypeController = require('../controllers/filetypeController');

// Create
router.post('/', filetypeController.createFiletype);
// Read all
router.get('/', filetypeController.getFiletypes);
// Read by ID
router.get('/:id', filetypeController.getFiletypeById);
// Update
router.put('/:id', filetypeController.updateFiletype);
// Delete
router.delete('/:id', filetypeController.deleteFiletype);

module.exports = router;
