const LessonPlan = require('../models/LessonPlan');

// Create a new LessonPlan
exports.createLessonPlan = async (req, res) => {
  try {
    const lessonPlan = new LessonPlan(req.body);
    await lessonPlan.save();
    res.status(201).json(lessonPlan);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all LessonPlans
exports.getAllLessonPlans = async (req, res) => {
  try {
    const lessonPlans = await LessonPlan.find()
      .populate('lesson_id')
      .populate('teacher_id');
    res.json(lessonPlans);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get LessonPlan by ID
exports.getLessonPlanById = async (req, res) => {
  try {
    const lessonPlan = await LessonPlan.findById(req.params.id)
      .populate('lesson_id')
      .populate('teacher_id');
    if (!lessonPlan) return res.status(404).json({ error: 'LessonPlan not found' });
    res.json(lessonPlan);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update LessonPlan
exports.updateLessonPlan = async (req, res) => {
  try {
    const lessonPlan = await LessonPlan.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!lessonPlan) return res.status(404).json({ error: 'LessonPlan not found' });
    res.json(lessonPlan);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete LessonPlan
exports.deleteLessonPlan = async (req, res) => {
  try {
    const lessonPlan = await LessonPlan.findByIdAndDelete(req.params.id);
    if (!lessonPlan) return res.status(404).json({ error: 'LessonPlan not found' });
    res.json({ message: 'LessonPlan deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
