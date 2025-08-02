const Module = require('../models/Module');

// Create a new module
exports.createModule = async (req, res) => {
  try {
    const module = new Module(req.body);
    await module.save();
    res.status(201).json(module);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all modules
exports.getAllModules = async (req, res) => {
  try {
    const modules = await Module.find();
    res.json(modules);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get a module by ID
exports.getModuleById = async (req, res) => {
  try {
    const module = await Module.findById(req.params.id);
    if (!module) return res.status(404).json({ error: 'Module not found' });
    res.json(module);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update a module
exports.updateModule = async (req, res) => {
  try {
    const module = await Module.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!module) return res.status(404).json({ error: 'Module not found' });
    res.json(module);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete a module
exports.deleteModule = async (req, res) => {
  try {
    const module = await Module.findByIdAndDelete(req.params.id);
    if (!module) return res.status(404).json({ error: 'Module not found' });
    res.json({ message: 'Module deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
