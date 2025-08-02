const express = require('express');
const router = express.Router();
const onlineExamController = require('../controllers/onlineExamController');

// Create or update an online exam
router.post('/', onlineExamController.createOrUpdateOnlineExam);

// Get all online exams with pagination and filtering
router.get('/', onlineExamController.getAllOnlineExams);

// Get exam statistics for a session
router.get('/session/:session_id/stats', onlineExamController.getExamStatistics);

// Get active exams for a session
router.get('/session/:session_id/active', onlineExamController.getActiveExams);

// Get upcoming exams for a session
router.get('/session/:session_id/upcoming', onlineExamController.getUpcomingExams);

// Get ongoing exams for a session
router.get('/session/:session_id/ongoing', onlineExamController.getOngoingExams);

// Get completed exams for a session
router.get('/session/:session_id/completed', onlineExamController.getCompletedExams);

// Bulk delete online exams
router.delete('/bulk', onlineExamController.bulkDeleteOnlineExams);

// Get online exam by ID
router.get('/:id', onlineExamController.getOnlineExamById);

// Toggle exam status
router.patch('/:id/toggle', onlineExamController.toggleExamStatus);

// Delete online exam by ID
router.delete('/:id', onlineExamController.deleteOnlineExam);

module.exports = router;
