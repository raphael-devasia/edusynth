const Income = require('../models/Income');

// Create a new income
exports.createIncome = async (req, res) => {
  try {
    const income = new Income(req.body);
    await income.save();
    res.status(201).json(income);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all incomes or by ID
exports.getIncomes = async (req, res) => {
  try {
    const { id } = req.query;
    if (id) {
      const income = await Income.findById(id).populate('income_head_id');
      if (!income) return res.status(404).json({ error: 'Income not found' });
      res.json(income);
    } else {
      const incomes = await Income.find().populate('income_head_id');
      res.json(incomes);
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update an income
exports.updateIncome = async (req, res) => {
  try {
    const income = await Income.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!income) return res.status(404).json({ error: 'Income not found' });
    res.json(income);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete an income
exports.deleteIncome = async (req, res) => {
  try {
    const income = await Income.findByIdAndDelete(req.params.id);
    if (!income) return res.status(404).json({ error: 'Income not found' });
    res.json({ message: 'Income deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
