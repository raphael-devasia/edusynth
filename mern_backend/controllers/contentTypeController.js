const ContentType = require('../models/ContentType');

// Create a new content type
exports.createContentType = async (req, res) => {
  try {
    const contentType = new ContentType(req.body);
    await contentType.save();
    res.status(201).json(contentType);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all content types or by ID
exports.getContentTypes = async (req, res) => {
  try {
    const { id } = req.query;
    if (id) {
      const contentType = await ContentType.findById(id);
      if (!contentType) return res.status(404).json({ error: 'ContentType not found' });
      res.json(contentType);
    } else {
      const contentTypes = await ContentType.find();
      res.json(contentTypes);
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update a content type
exports.updateContentType = async (req, res) => {
  try {
    const contentType = await ContentType.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!contentType) return res.status(404).json({ error: 'ContentType not found' });
    res.json(contentType);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete a content type
exports.deleteContentType = async (req, res) => {
  try {
    const contentType = await ContentType.findByIdAndDelete(req.params.id);
    if (!contentType) return res.status(404).json({ error: 'ContentType not found' });
    res.json({ message: 'ContentType deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
