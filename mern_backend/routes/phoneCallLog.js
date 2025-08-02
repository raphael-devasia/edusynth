const express = require('express');
const router = express.Router();
const controller = require('../controllers/phoneCallLogController');

// List all phone call logs
router.get('/', controller.getAll);
// Get by ID
router.get('/:id', controller.getById);
// Create
router.post('/', controller.create);
// Update
router.put('/:id', controller.update);
// Delete
router.delete('/:id', controller.remove);

module.exports = router;
