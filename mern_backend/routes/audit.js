const express = require('express');
const router = express.Router();
const auditController = require('../controllers/auditController');

// Create a new audit log
router.post('/', auditController.createAudit);

// Get all audit logs
router.get('/', auditController.getAudits);

// Get an audit log by ID
router.get('/:id', auditController.getAuditById);

// Update an audit log
router.put('/:id', auditController.updateAudit);

// Delete an audit log
router.delete('/:id', auditController.deleteAudit);

module.exports = router;
