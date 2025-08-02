const mongoose = require('mongoose');

const VideoTutorialSchema = new mongoose.Schema({
  title: { type: String, required: true },
  vid_title: { type: String },
  description: { type: String, required: true },
  thumb_path: { type: String },
  dir_path: { type: String },
  img_name: { type: String, required: true },
  thumb_name: { type: String, required: true },
  video_link: { type: String, required: true },
  created_by: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('VideoTutorial', VideoTutorialSchema);
