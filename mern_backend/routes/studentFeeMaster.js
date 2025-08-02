const express = require('express');
const router = express.Router();
const studentFeeMasterController = require('../controllers/studentFeeMasterController');

// Create a new student fee master
router.post('/', studentFeeMasterController.createStudentFeeMaster);

// Get all student fee masters
router.get('/', studentFeeMasterController.getStudentFeeMasters);

// Get a student fee master by ID
router.get('/:id', studentFeeMasterController.getStudentFeeMasterById);

// Update a student fee master
router.put('/:id', studentFeeMasterController.updateStudentFeeMaster);

// Delete a student fee master
router.delete('/:id', studentFeeMasterController.deleteStudentFeeMaster);

module.exports = router;
