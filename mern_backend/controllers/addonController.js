const Addon = require('../models/Addon');

// Create a new addon
exports.createAddon = async (req, res) => {
  try {
    const addon = new Addon(req.body);
    await addon.save();
    res.status(201).json(addon);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all addons
exports.getAddons = async (req, res) => {
  try {
    const addons = await Addon.find();
    res.json(addons);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get an addon by ID
exports.getAddonById = async (req, res) => {
  try {
    const addon = await Addon.findById(req.params.id);
    if (!addon) return res.status(404).json({ error: 'Addon not found' });
    res.json(addon);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update an addon
exports.updateAddon = async (req, res) => {
  try {
    const addon = await Addon.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!addon) return res.status(404).json({ error: 'Addon not found' });
    res.json(addon);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete an addon
exports.deleteAddon = async (req, res) => {
  try {
    const addon = await Addon.findByIdAndDelete(req.params.id);
    if (!addon) return res.status(404).json({ error: 'Addon not found' });
    res.json({ message: 'Addon deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
