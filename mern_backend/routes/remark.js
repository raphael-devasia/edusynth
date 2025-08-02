const express = require('express');
const router = express.Router();
const remarkController = require('../controllers/remarkController');

// Create a new Remark
router.post('/', remarkController.createRemark);

// Get all Remarks
router.get('/', remarkController.getAllRemarks);

// Get Remark by ID
router.get('/:id', remarkController.getRemarkById);

// Update Remark
router.put('/:id', remarkController.updateRemark);

// Delete Remark
router.delete('/:id', remarkController.deleteRemark);

module.exports = router;
