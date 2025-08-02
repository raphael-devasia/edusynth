const Accountant = require('../models/Accountant');

// Create a new accountant
exports.createAccountant = async (req, res) => {
  try {
    const accountant = new Accountant(req.body);
    await accountant.save();
    res.status(201).json(accountant);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all accountants
exports.getAccountants = async (req, res) => {
  try {
    const accountants = await Accountant.find().populate('user_id');
    res.json(accountants);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get an accountant by ID
exports.getAccountantById = async (req, res) => {
  try {
    const accountant = await Accountant.findById(req.params.id).populate('user_id');
    if (!accountant) return res.status(404).json({ error: 'Accountant not found' });
    res.json(accountant);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update an accountant
exports.updateAccountant = async (req, res) => {
  try {
    const accountant = await Accountant.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!accountant) return res.status(404).json({ error: 'Accountant not found' });
    res.json(accountant);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete an accountant
exports.deleteAccountant = async (req, res) => {
  try {
    const accountant = await Accountant.findByIdAndDelete(req.params.id);
    if (!accountant) return res.status(404).json({ error: 'Accountant not found' });
    res.json({ message: 'Accountant deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
