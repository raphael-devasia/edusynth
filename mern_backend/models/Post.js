const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  author_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  published: { type: Boolean, default: false },
  published_at: { type: Date },
  tags: [{ type: String }],
  is_active: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('Post', PostSchema);
