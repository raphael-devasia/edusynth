const StudentTimeline = require('../models/StudentTimeline');

// Create or update student timeline
exports.createOrUpdateStudentTimeline = async (req, res) => {
  try {
    const data = req.body;
    let timeline;
    if (data.id) {
      timeline = await StudentTimeline.findByIdAndUpdate(data.id, data, { new: true });
    } else {
      timeline = new StudentTimeline(data);
      await timeline.save();
    }
    res.status(201).json(timeline);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get student timelines by student_id (and optional status)
exports.getStudentTimelines = async (req, res) => {
  try {
    const { student_id, status } = req.query;
    let filter = {};
    if (student_id) filter.student_id = student_id;
    if (status) filter.status = status;
    const timelines = await StudentTimeline.find(filter).sort({ timeline_date: 1 });
    res.json(timelines);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete a student timeline
exports.deleteStudentTimeline = async (req, res) => {
  try {
    const timeline = await StudentTimeline.findByIdAndDelete(req.params.id);
    if (!timeline) return res.status(404).json({ error: 'StudentTimeline not found' });
    res.json({ message: 'StudentTimeline deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
