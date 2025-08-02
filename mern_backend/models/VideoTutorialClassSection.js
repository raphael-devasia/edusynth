const mongoose = require('mongoose');

const VideoTutorialClassSectionSchema = new mongoose.Schema({
  video_tutorial_id: { type: mongoose.Schema.Types.ObjectId, ref: 'VideoTutorial', required: true },
  class_section_id: { type: mongoose.Schema.Types.ObjectId, ref: 'ClassSection', required: true },
  created_date: { type: Date, required: true },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('VideoTutorialClassSection', VideoTutorialClassSectionSchema);
