const CmsMenuItem = require('../models/CmsMenuItem');

// Create a new menu item
exports.createCmsMenuItem = async (req, res) => {
  try {
    const menuItem = new CmsMenuItem(req.body);
    await menuItem.save();
    res.status(201).json(menuItem);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all menu items or by ID
exports.getCmsMenuItems = async (req, res) => {
  try {
    const { id } = req.query;
    if (id) {
      const menuItem = await CmsMenuItem.findById(id);
      if (!menuItem) return res.status(404).json({ error: 'CmsMenuItem not found' });
      res.json(menuItem);
    } else {
      const menuItems = await CmsMenuItem.find();
      res.json(menuItems);
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get menu item by slug
exports.getCmsMenuItemBySlug = async (req, res) => {
  try {
    const { slug } = req.params;
    const menuItem = await CmsMenuItem.findOne({ slug });
    if (!menuItem) return res.status(404).json({ error: 'CmsMenuItem not found' });
    res.json(menuItem);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update a menu item
exports.updateCmsMenuItem = async (req, res) => {
  try {
    const menuItem = await CmsMenuItem.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!menuItem) return res.status(404).json({ error: 'CmsMenuItem not found' });
    res.json(menuItem);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete a menu item
exports.deleteCmsMenuItem = async (req, res) => {
  try {
    const menuItem = await CmsMenuItem.findByIdAndDelete(req.params.id);
    if (!menuItem) return res.status(404).json({ error: 'CmsMenuItem not found' });
    res.json({ message: 'CmsMenuItem deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
