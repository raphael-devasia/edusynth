const Loan = require('../models/Loan');

// Create a new Loan
exports.createLoan = async (req, res) => {
  try {
    const loan = new Loan(req.body);
    await loan.save();
    res.status(201).json(loan);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all Loans
exports.getAllLoans = async (req, res) => {
  try {
    const loans = await Loan.find()
      .populate('book_id')
      .populate('student_id');
    res.json(loans);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get Loan by ID
exports.getLoanById = async (req, res) => {
  try {
    const loan = await Loan.findById(req.params.id)
      .populate('book_id')
      .populate('student_id');
    if (!loan) return res.status(404).json({ error: 'Loan not found' });
    res.json(loan);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update Loan
exports.updateLoan = async (req, res) => {
  try {
    const loan = await Loan.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!loan) return res.status(404).json({ error: 'Loan not found' });
    res.json(loan);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete Loan
exports.deleteLoan = async (req, res) => {
  try {
    const loan = await Loan.findByIdAndDelete(req.params.id);
    if (!loan) return res.status(404).json({ error: 'Loan not found' });
    res.json({ message: 'Loan deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
