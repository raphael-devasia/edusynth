const ExpenseHead = require('../models/ExpenseHead');

// Create a new expense head
exports.createExpenseHead = async (req, res) => {
  try {
    const expenseHead = new ExpenseHead(req.body);
    await expenseHead.save();
    res.status(201).json(expenseHead);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all expense heads or by ID
exports.getExpenseHeads = async (req, res) => {
  try {
    const { id } = req.query;
    if (id) {
      const expenseHead = await ExpenseHead.findById(id);
      if (!expenseHead) return res.status(404).json({ error: 'ExpenseHead not found' });
      res.json(expenseHead);
    } else {
      const expenseHeads = await ExpenseHead.find().sort({ _id: 1 });
      res.json(expenseHeads);
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update an expense head
exports.updateExpenseHead = async (req, res) => {
  try {
    const expenseHead = await ExpenseHead.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!expenseHead) return res.status(404).json({ error: 'ExpenseHead not found' });
    res.json(expenseHead);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete an expense head
exports.deleteExpenseHead = async (req, res) => {
  try {
    const expenseHead = await ExpenseHead.findByIdAndDelete(req.params.id);
    if (!expenseHead) return res.status(404).json({ error: 'ExpenseHead not found' });
    res.json({ message: 'ExpenseHead deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
