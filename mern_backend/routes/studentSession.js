const express = require('express');
const router = express.Router();
const studentSessionController = require('../controllers/studentSessionController');

// Create student session
router.post('/', studentSessionController.createStudentSession);
// Get all student sessions
router.get('/', studentSessionController.getAllStudentSessions);
// Get student session by ID
router.get('/:id', studentSessionController.getStudentSessionById);
// Update student session
router.put('/:id', studentSessionController.updateStudentSession);
// Delete student session
router.delete('/:id', studentSessionController.deleteStudentSession);

module.exports = router;
