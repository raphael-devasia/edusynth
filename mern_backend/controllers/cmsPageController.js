const CmsPage = require('../models/CmsPage');

// Create a new CMS page
exports.createCmsPage = async (req, res) => {
  try {
    const page = new CmsPage(req.body);
    await page.save();
    res.status(201).json(page);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all CMS pages or by ID
exports.getCmsPages = async (req, res) => {
  try {
    const { id } = req.query;
    if (id) {
      const page = await CmsPage.findById(id);
      if (!page) return res.status(404).json({ error: 'CmsPage not found' });
      res.json(page);
    } else {
      const pages = await CmsPage.find();
      res.json(pages);
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get CMS page by slug
exports.getCmsPageBySlug = async (req, res) => {
  try {
    const { slug } = req.params;
    const page = await CmsPage.findOne({ slug });
    if (!page) return res.status(404).json({ error: 'CmsPage not found' });
    res.json(page);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update a CMS page
exports.updateCmsPage = async (req, res) => {
  try {
    const page = await CmsPage.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!page) return res.status(404).json({ error: 'CmsPage not found' });
    res.json(page);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete a CMS page
exports.deleteCmsPage = async (req, res) => {
  try {
    const page = await CmsPage.findByIdAndDelete(req.params.id);
    if (!page) return res.status(404).json({ error: 'CmsPage not found' });
    res.json({ message: 'CmsPage deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
