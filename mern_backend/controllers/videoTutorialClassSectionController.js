const VideoTutorialClassSection = require('../models/VideoTutorialClassSection');

// Create a new video tutorial class section
exports.createVideoTutorialClassSection = async (req, res) => {
  try {
    const videoTutorialClassSection = new VideoTutorialClassSection(req.body);
    await videoTutorialClassSection.save();
    res.status(201).json(videoTutorialClassSection);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all video tutorial class sections
exports.getVideoTutorialClassSections = async (req, res) => {
  try {
    const videoTutorialClassSections = await VideoTutorialClassSection.find()
      .populate('video_tutorial_id')
      .populate('class_section_id');
    res.json(videoTutorialClassSections);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get a single video tutorial class section by ID
exports.getVideoTutorialClassSectionById = async (req, res) => {
  try {
    const videoTutorialClassSection = await VideoTutorialClassSection.findById(req.params.id)
      .populate('video_tutorial_id')
      .populate('class_section_id');
    if (!videoTutorialClassSection) return res.status(404).json({ error: 'Video tutorial class section not found' });
    res.json(videoTutorialClassSection);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update a video tutorial class section
exports.updateVideoTutorialClassSection = async (req, res) => {
  try {
    const videoTutorialClassSection = await VideoTutorialClassSection.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!videoTutorialClassSection) return res.status(404).json({ error: 'Video tutorial class section not found' });
    res.json(videoTutorialClassSection);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete a video tutorial class section
exports.deleteVideoTutorialClassSection = async (req, res) => {
  try {
    const videoTutorialClassSection = await VideoTutorialClassSection.findByIdAndDelete(req.params.id);
    if (!videoTutorialClassSection) return res.status(404).json({ error: 'Video tutorial class section not found' });
    res.json({ message: 'Video tutorial class section deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
