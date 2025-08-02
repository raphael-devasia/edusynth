const express = require('express');
const router = express.Router();
const studentHouseController = require('../controllers/studentHouseController');

// Create a new student house assignment
router.post('/', studentHouseController.createStudentHouse);

// Get all student house assignments
router.get('/', studentHouseController.getAllStudentHouses);

// Get student house assignment by ID
router.get('/:id', studentHouseController.getStudentHouseById);

// Update student house assignment
router.put('/:id', studentHouseController.updateStudentHouse);

// Delete student house assignment
router.delete('/:id', studentHouseController.deleteStudentHouse);

module.exports = router;
