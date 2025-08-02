const ModulePermission = require('../models/ModulePermission');

// Create a new module permission
exports.createModulePermission = async (req, res) => {
  try {
    const modulePermission = new ModulePermission(req.body);
    await modulePermission.save();
    res.status(201).json(modulePermission);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all module permissions
exports.getAllModulePermissions = async (req, res) => {
  try {
    const modulePermissions = await ModulePermission.find()
      .populate('module_id', 'name')
      .populate('role_id', 'name');
    res.json(modulePermissions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get a module permission by ID
exports.getModulePermissionById = async (req, res) => {
  try {
    const modulePermission = await ModulePermission.findById(req.params.id)
      .populate('module_id', 'name')
      .populate('role_id', 'name');
    if (!modulePermission) return res.status(404).json({ error: 'ModulePermission not found' });
    res.json(modulePermission);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update a module permission
exports.updateModulePermission = async (req, res) => {
  try {
    const modulePermission = await ModulePermission.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!modulePermission) return res.status(404).json({ error: 'ModulePermission not found' });
    res.json(modulePermission);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete a module permission
exports.deleteModulePermission = async (req, res) => {
  try {
    const modulePermission = await ModulePermission.findByIdAndDelete(req.params.id);
    if (!modulePermission) return res.status(404).json({ error: 'ModulePermission not found' });
    res.json({ message: 'ModulePermission deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
