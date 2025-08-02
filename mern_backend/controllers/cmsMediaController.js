const CmsMedia = require('../models/CmsMedia');

// Bulk add media
exports.bulkAddCmsMedia = async (req, res) => {
  try {
    const mediaArray = req.body;
    const inserted = await CmsMedia.insertMany(mediaArray);
    res.status(201).json(inserted);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Add a single media
exports.createCmsMedia = async (req, res) => {
  try {
    const cmsMedia = new CmsMedia(req.body);
    await cmsMedia.save();
    res.status(201).json(cmsMedia);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all media or by ID
exports.getCmsMedia = async (req, res) => {
  try {
    const { id } = req.query;
    if (id) {
      const media = await CmsMedia.findById(id);
      if (!media) return res.status(404).json({ error: 'CmsMedia not found' });
      res.json(media);
    } else {
      const mediaList = await CmsMedia.find();
      res.json(mediaList);
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get media by slug (img_name)
exports.getCmsMediaBySlug = async (req, res) => {
  try {
    const { slug } = req.params;
    const media = await CmsMedia.findOne({ img_name: slug });
    if (!media) return res.status(404).json({ error: 'CmsMedia not found' });
    res.json(media);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update a media
exports.updateCmsMedia = async (req, res) => {
  try {
    const media = await CmsMedia.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!media) return res.status(404).json({ error: 'CmsMedia not found' });
    res.json(media);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete a media
exports.deleteCmsMedia = async (req, res) => {
  try {
    const media = await CmsMedia.findByIdAndDelete(req.params.id);
    if (!media) return res.status(404).json({ error: 'CmsMedia not found' });
    res.json({ message: 'CmsMedia deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
