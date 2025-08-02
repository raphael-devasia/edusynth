const CmsPageContent = require('../models/CmsPageContent');

// Create a new CMS page content
exports.createCmsPageContent = async (req, res) => {
  try {
    const content = new CmsPageContent(req.body);
    await content.save();
    res.status(201).json(content);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all CMS page contents or by ID
exports.getCmsPageContents = async (req, res) => {
  try {
    const { id } = req.query;
    if (id) {
      const content = await CmsPageContent.findById(id);
      if (!content) return res.status(404).json({ error: 'CmsPageContent not found' });
      res.json(content);
    } else {
      const contents = await CmsPageContent.find();
      res.json(contents);
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get CMS page contents by page_id
exports.getCmsPageContentsByPage = async (req, res) => {
  try {
    const { page_id } = req.params;
    const contents = await CmsPageContent.find({ page_id });
    res.json(contents);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update a CMS page content
exports.updateCmsPageContent = async (req, res) => {
  try {
    const content = await CmsPageContent.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!content) return res.status(404).json({ error: 'CmsPageContent not found' });
    res.json(content);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete a CMS page content
exports.deleteCmsPageContent = async (req, res) => {
  try {
    const content = await CmsPageContent.findByIdAndDelete(req.params.id);
    if (!content) return res.status(404).json({ error: 'CmsPageContent not found' });
    res.json({ message: 'CmsPageContent deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
