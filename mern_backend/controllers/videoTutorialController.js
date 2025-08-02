const VideoTutorial = require('../models/VideoTutorial');

// Create a new video tutorial
exports.createVideoTutorial = async (req, res) => {
  try {
    const videoTutorial = new VideoTutorial(req.body);
    await videoTutorial.save();
    res.status(201).json(videoTutorial);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all video tutorials
exports.getVideoTutorials = async (req, res) => {
  try {
    const videoTutorials = await VideoTutorial.find().populate('created_by');
    res.json(videoTutorials);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get a single video tutorial by ID
exports.getVideoTutorialById = async (req, res) => {
  try {
    const videoTutorial = await VideoTutorial.findById(req.params.id).populate('created_by');
    if (!videoTutorial) return res.status(404).json({ error: 'Video tutorial not found' });
    res.json(videoTutorial);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update a video tutorial
exports.updateVideoTutorial = async (req, res) => {
  try {
    const videoTutorial = await VideoTutorial.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!videoTutorial) return res.status(404).json({ error: 'Video tutorial not found' });
    res.json(videoTutorial);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete a video tutorial
exports.deleteVideoTutorial = async (req, res) => {
  try {
    const videoTutorial = await VideoTutorial.findByIdAndDelete(req.params.id);
    if (!videoTutorial) return res.status(404).json({ error: 'Video tutorial not found' });
    res.json({ message: 'Video tutorial deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
