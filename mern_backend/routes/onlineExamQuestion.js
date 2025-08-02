const express = require('express');
const router = express.Router();
const onlineExamQuestionController = require('../controllers/onlineExamQuestionController');

// Add question to exam
router.post('/add', onlineExamQuestionController.addQuestionToExam);

// Bulk add questions to exam
router.post('/bulk-add', onlineExamQuestionController.bulkAddQuestionsToExam);

// Get questions by exam ID with pagination and filtering
router.get('/exam/:exam_id', onlineExamQuestionController.getQuestionsByExamId);

// Get all questions for an exam (no pagination)
router.get('/exam/:exam_id/all', onlineExamQuestionController.getAllExamQuestions);

// Get exam question subjects
router.get('/exam/:exam_id/subjects', onlineExamQuestionController.getExamQuestionSubjects);

// Get exam question statistics
router.get('/exam/:exam_id/stats', onlineExamQuestionController.getExamQuestionStats);

// Reorder exam questions
router.patch('/exam/:exam_id/reorder', onlineExamQuestionController.reorderExamQuestions);

// Bulk remove questions from exam
router.delete('/bulk-remove', onlineExamQuestionController.bulkRemoveQuestionsFromExam);

// Create a new online exam question (legacy)
router.post('/', onlineExamQuestionController.createOnlineExamQuestion);

// Get all online exam questions or by filter (legacy)
router.get('/', onlineExamQuestionController.getOnlineExamQuestions);

// Update an online exam question
router.put('/:id', onlineExamQuestionController.updateExamQuestion);

// Remove question from exam
router.delete('/:id', onlineExamQuestionController.removeQuestionFromExam);

module.exports = router;
