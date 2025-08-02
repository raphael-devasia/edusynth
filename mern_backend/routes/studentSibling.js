const express = require('express');
const router = express.Router();
const studentSiblingController = require('../controllers/studentSiblingController');

// Create a new student sibling record
router.post('/', studentSiblingController.createStudentSibling);

// Get all student sibling records
router.get('/', studentSiblingController.getAllStudentSiblings);

// Get student sibling record by ID
router.get('/:id', studentSiblingController.getStudentSiblingById);

// Update student sibling record
router.put('/:id', studentSiblingController.updateStudentSibling);

// Delete student sibling record
router.delete('/:id', studentSiblingController.deleteStudentSibling);

module.exports = router;
