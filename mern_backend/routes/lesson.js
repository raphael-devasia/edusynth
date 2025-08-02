const express = require('express');
const router = express.Router();
const lessonController = require('../controllers/lessonController');

// Create a new Lesson
router.post('/', lessonController.createLesson);

// Get all Lessons
router.get('/', lessonController.getAllLessons);

// Get Lesson by ID
router.get('/:id', lessonController.getLessonById);

// Update Lesson
router.put('/:id', lessonController.updateLesson);

// Delete Lesson
router.delete('/:id', lessonController.deleteLesson);

module.exports = router;
