const express = require('express');
const router = express.Router();
const feesGroupStudentController = require('../controllers/feesGroupStudentController');

// Create a new FeesGroupStudent
router.post('/', feesGroupStudentController.createFeesGroupStudent);

// Get all FeesGroupStudents
router.get('/', feesGroupStudentController.getAllFeesGroupStudents);

// Get FeesGroupStudent by ID
router.get('/:id', feesGroupStudentController.getFeesGroupStudentById);

// Update FeesGroupStudent
router.put('/:id', feesGroupStudentController.updateFeesGroupStudent);

// Delete FeesGroupStudent
router.delete('/:id', feesGroupStudentController.deleteFeesGroupStudent);

module.exports = router;
