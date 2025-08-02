const express = require('express');
const router = express.Router();
const lessonPlanController = require('../controllers/lessonPlanController');

// Create a new LessonPlan
router.post('/', lessonPlanController.createLessonPlan);

// Get all LessonPlans
router.get('/', lessonPlanController.getAllLessonPlans);

// Get LessonPlan by ID
router.get('/:id', lessonPlanController.getLessonPlanById);

// Update LessonPlan
router.put('/:id', lessonPlanController.updateLessonPlan);

// Delete LessonPlan
router.delete('/:id', lessonPlanController.deleteLessonPlan);

module.exports = router;
