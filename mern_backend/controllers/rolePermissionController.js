const RolePermission = require('../models/RolePermission');

// Create a new role permission
exports.createRolePermission = async (req, res) => {
  try {
    const rolePermission = new RolePermission(req.body);
    await rolePermission.save();
    res.status(201).json(rolePermission);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all role permissions
exports.getAllRolePermissions = async (req, res) => {
  try {
    const rolePermissions = await RolePermission.find().populate('role_id', 'name');
    res.json(rolePermissions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get a role permission by ID
exports.getRolePermissionById = async (req, res) => {
  try {
    const rolePermission = await RolePermission.findById(req.params.id).populate('role_id', 'name');
    if (!rolePermission) return res.status(404).json({ error: 'RolePermission not found' });
    res.json(rolePermission);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update a role permission
exports.updateRolePermission = async (req, res) => {
  try {
    const rolePermission = await RolePermission.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!rolePermission) return res.status(404).json({ error: 'RolePermission not found' });
    res.json(rolePermission);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete a role permission
exports.deleteRolePermission = async (req, res) => {
  try {
    const rolePermission = await RolePermission.findByIdAndDelete(req.params.id);
    if (!rolePermission) return res.status(404).json({ error: 'RolePermission not found' });
    res.json({ message: 'RolePermission deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
