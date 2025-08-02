const Department = require('../models/Department');

// Create a new department
exports.createDepartment = async (req, res) => {
  try {
    const department = new Department(req.body);
    await department.save();
    res.status(201).json(department);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all departments or by ID
exports.getDepartments = async (req, res) => {
  try {
    const { id } = req.query;
    if (id) {
      const department = await Department.findById(id);
      if (!department) return res.status(404).json({ error: 'Department not found' });
      res.json(department);
    } else {
      const departments = await Department.find();
      res.json(departments);
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update a department
exports.updateDepartment = async (req, res) => {
  try {
    const department = await Department.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!department) return res.status(404).json({ error: 'Department not found' });
    res.json(department);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete a department
exports.deleteDepartment = async (req, res) => {
  try {
    const department = await Department.findByIdAndDelete(req.params.id);
    if (!department) return res.status(404).json({ error: 'Department not found' });
    res.json({ message: 'Department deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
