const Salary = require('../models/Salary');

// Create a new Salary
exports.createSalary = async (req, res) => {
  try {
    const salary = new Salary(req.body);
    await salary.save();
    res.status(201).json(salary);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all Salaries
exports.getAllSalaries = async (req, res) => {
  try {
    const salaries = await Salary.find().populate('staff_id');
    res.json(salaries);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get Salary by ID
exports.getSalaryById = async (req, res) => {
  try {
    const salary = await Salary.findById(req.params.id).populate('staff_id');
    if (!salary) return res.status(404).json({ error: 'Salary not found' });
    res.json(salary);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update Salary
exports.updateSalary = async (req, res) => {
  try {
    const salary = await Salary.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!salary) return res.status(404).json({ error: 'Salary not found' });
    res.json(salary);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete Salary
exports.deleteSalary = async (req, res) => {
  try {
    const salary = await Salary.findByIdAndDelete(req.params.id);
    if (!salary) return res.status(404).json({ error: 'Salary not found' });
    res.json({ message: 'Salary deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
