const Lesson = require('../models/Lesson');

// Create a new Lesson
exports.createLesson = async (req, res) => {
  try {
    const lesson = new Lesson(req.body);
    await lesson.save();
    res.status(201).json(lesson);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all Lessons
exports.getAllLessons = async (req, res) => {
  try {
    const lessons = await Lesson.find()
      .populate('subject_id')
      .populate('class_id')
      .populate('section_id');
    res.json(lessons);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get Lesson by ID
exports.getLessonById = async (req, res) => {
  try {
    const lesson = await Lesson.findById(req.params.id)
      .populate('subject_id')
      .populate('class_id')
      .populate('section_id');
    if (!lesson) return res.status(404).json({ error: 'Lesson not found' });
    res.json(lesson);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update Lesson
exports.updateLesson = async (req, res) => {
  try {
    const lesson = await Lesson.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!lesson) return res.status(404).json({ error: 'Lesson not found' });
    res.json(lesson);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete Lesson
exports.deleteLesson = async (req, res) => {
  try {
    const lesson = await Lesson.findByIdAndDelete(req.params.id);
    if (!lesson) return res.status(404).json({ error: 'Lesson not found' });
    res.json({ message: 'Lesson deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
