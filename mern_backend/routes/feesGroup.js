const express = require('express');
const router = express.Router();
const feesGroupController = require('../controllers/feesGroupController');

// Create a new fees group
router.post('/', feesGroupController.createFeesGroup);

// Get all fees groups
router.get('/', feesGroupController.getAllFeesGroups);

// Get fees group by ID
router.get('/:id', feesGroupController.getFeesGroupById);

// Update fees group
router.put('/:id', feesGroupController.updateFeesGroup);

// Delete fees group
router.delete('/:id', feesGroupController.deleteFeesGroup);

module.exports = router;
