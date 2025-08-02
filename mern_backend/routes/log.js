const express = require('express');
const router = express.Router();
const logController = require('../controllers/logController');

// Create a new Log
router.post('/', logController.createLog);

// Get all Logs
router.get('/', logController.getAllLogs);

// Get Log by ID
router.get('/:id', logController.getLogById);

// Update Log
router.put('/:id', logController.updateLog);

// Delete Log
router.delete('/:id', logController.deleteLog);

module.exports = router;
