const CmsMenu = require('../models/CmsMenu');

// Create a new menu
exports.createCmsMenu = async (req, res) => {
  try {
    const menu = new CmsMenu(req.body);
    await menu.save();
    res.status(201).json(menu);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all menus or by ID
exports.getCmsMenus = async (req, res) => {
  try {
    const { id } = req.query;
    if (id) {
      const menu = await CmsMenu.findById(id);
      if (!menu) return res.status(404).json({ error: 'CmsMenu not found' });
      res.json(menu);
    } else {
      const menus = await CmsMenu.find();
      res.json(menus);
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get menu by slug
exports.getCmsMenuBySlug = async (req, res) => {
  try {
    const { slug } = req.params;
    const menu = await CmsMenu.findOne({ slug });
    if (!menu) return res.status(404).json({ error: 'CmsMenu not found' });
    res.json(menu);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update a menu
exports.updateCmsMenu = async (req, res) => {
  try {
    const menu = await CmsMenu.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!menu) return res.status(404).json({ error: 'CmsMenu not found' });
    res.json(menu);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete a menu
exports.deleteCmsMenu = async (req, res) => {
  try {
    const menu = await CmsMenu.findByIdAndDelete(req.params.id);
    if (!menu) return res.status(404).json({ error: 'CmsMenu not found' });
    res.json({ message: 'CmsMenu deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
