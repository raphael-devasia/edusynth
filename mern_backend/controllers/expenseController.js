const Expense = require('../models/Expense');

// Create a new expense
exports.createExpense = async (req, res) => {
  try {
    const expense = new Expense(req.body);
    await expense.save();
    res.status(201).json(expense);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all expenses or by ID
exports.getExpenses = async (req, res) => {
  try {
    const { id } = req.query;
    if (id) {
      const expense = await Expense.findById(id);
      if (!expense) return res.status(404).json({ error: 'Expense not found' });
      res.json(expense);
    } else {
      const expenses = await Expense.find();
      res.json(expenses);
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update an expense
exports.updateExpense = async (req, res) => {
  try {
    const expense = await Expense.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!expense) return res.status(404).json({ error: 'Expense not found' });
    res.json(expense);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete an expense
exports.deleteExpense = async (req, res) => {
  try {
    const expense = await Expense.findByIdAndDelete(req.params.id);
    if (!expense) return res.status(404).json({ error: 'Expense not found' });
    res.json({ message: 'Expense deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
