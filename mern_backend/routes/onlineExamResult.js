const express = require('express');
const router = express.Router();
const onlineExamResultController = require('../controllers/onlineExamResultController');

// Add or update a result
router.post('/', onlineExamResultController.addOrUpdateResult);

// Get results by student and exam
router.get('/student/:onlineexam_student_id/exam/:exam_id', onlineExamResultController.getResultByStudent);

// Get descriptive answers for an exam
router.get('/exam/:exam_id/descriptive', onlineExamResultController.getDescriptionRecord);

// Get students by exam/class/section
router.get('/exam/:exam_id/class/:class_id/section/:section_id', onlineExamResultController.getStudentByExam);

// Check if result is prepared for a student
router.get('/check/:onlineexam_student_id', onlineExamResultController.checkResultPrepare);

// Get rank for a student in an exam
router.get('/rank/:onlineexam_student_id/exam/:exam_id', onlineExamResultController.getOnlineExamRank);

// Delete a result
router.delete('/:id', onlineExamResultController.deleteResult);

module.exports = router;
