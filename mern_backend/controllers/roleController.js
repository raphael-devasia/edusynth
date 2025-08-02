const Role = require('../models/Role');

// Create a new role
exports.createRole = async (req, res) => {
  try {
    const role = new Role(req.body);
    await role.save();
    res.status(201).json(role);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all roles or by ID
exports.getRoles = async (req, res) => {
  try {
    const { id } = req.query;
    if (id) {
      const role = await Role.findById(id);
      if (!role) return res.status(404).json({ error: 'Role not found' });
      res.json(role);
    } else {
      const roles = await Role.find();
      res.json(roles);
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update a role
exports.updateRole = async (req, res) => {
  try {
    const role = await Role.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!role) return res.status(404).json({ error: 'Role not found' });
    res.json(role);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete a role
exports.deleteRole = async (req, res) => {
  try {
    const role = await Role.findByIdAndDelete(req.params.id);
    if (!role) return res.status(404).json({ error: 'Role not found' });
    res.json({ message: 'Role deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
