const Content = require('../models/Content');

// Create new content
exports.createContent = async (req, res) => {
  try {
    const content = new Content(req.body);
    await content.save();
    res.status(201).json(content);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all content or by ID
exports.getContents = async (req, res) => {
  try {
    const { id } = req.query;
    if (id) {
      const content = await Content.findById(id);
      if (!content) return res.status(404).json({ error: 'Content not found' });
      res.json(content);
    } else {
      const contents = await Content.find();
      res.json(contents);
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get content by category
exports.getContentsByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    const contents = await Content.find({ category });
    res.json(contents);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update content
exports.updateContent = async (req, res) => {
  try {
    const content = await Content.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!content) return res.status(404).json({ error: 'Content not found' });
    res.json(content);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete content
exports.deleteContent = async (req, res) => {
  try {
    const content = await Content.findByIdAndDelete(req.params.id);
    if (!content) return res.status(404).json({ error: 'Content not found' });
    res.json({ message: 'Content deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
