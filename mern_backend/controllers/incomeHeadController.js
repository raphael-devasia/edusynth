const IncomeHead = require('../models/IncomeHead');

// Create a new income head
exports.createIncomeHead = async (req, res) => {
  try {
    const incomeHead = new IncomeHead(req.body);
    await incomeHead.save();
    res.status(201).json(incomeHead);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all income heads or by ID
exports.getIncomeHeads = async (req, res) => {
  try {
    const { id } = req.query;
    if (id) {
      const incomeHead = await IncomeHead.findById(id);
      if (!incomeHead) return res.status(404).json({ error: 'Income head not found' });
      res.json(incomeHead);
    } else {
      const incomeHeads = await IncomeHead.find();
      res.json(incomeHeads);
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update an income head
exports.updateIncomeHead = async (req, res) => {
  try {
    const incomeHead = await IncomeHead.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!incomeHead) return res.status(404).json({ error: 'Income head not found' });
    res.json(incomeHead);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete an income head
exports.deleteIncomeHead = async (req, res) => {
  try {
    const incomeHead = await IncomeHead.findByIdAndDelete(req.params.id);
    if (!incomeHead) return res.status(404).json({ error: 'Income head not found' });
    res.json({ message: 'Income head deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
