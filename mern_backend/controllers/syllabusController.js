const Syllabus = require('../models/Syllabus');

// Create a new syllabus
exports.createSyllabus = async (req, res) => {
  try {
    const syllabus = new Syllabus(req.body);
    await syllabus.save();
    res.status(201).json(syllabus);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all syllabi or by ID
exports.getSyllabi = async (req, res) => {
  try {
    const { id } = req.query;
    if (id) {
      const syllabus = await Syllabus.findById(id)
        .populate('subject_id')
        .populate('class_id')
        .populate('section_id')
        .populate('session_id')
        .populate('lesson_id')
        .populate('topic_id')
        .populate('created_for');
      if (!syllabus) return res.status(404).json({ error: 'Syllabus not found' });
      res.json(syllabus);
    } else {
      const syllabi = await Syllabus.find()
        .populate('subject_id')
        .populate('class_id')
        .populate('section_id')
        .populate('session_id')
        .populate('lesson_id')
        .populate('topic_id')
        .populate('created_for');
      res.json(syllabi);
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update a syllabus
exports.updateSyllabus = async (req, res) => {
  try {
    const syllabus = await Syllabus.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!syllabus) return res.status(404).json({ error: 'Syllabus not found' });
    res.json(syllabus);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete a syllabus
exports.deleteSyllabus = async (req, res) => {
  try {
    const syllabus = await Syllabus.findByIdAndDelete(req.params.id);
    if (!syllabus) return res.status(404).json({ error: 'Syllabus not found' });
    res.json({ message: 'Syllabus deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
