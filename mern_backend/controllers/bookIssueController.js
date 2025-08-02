const BookIssue = require('../models/BookIssue');

// Create a new book issue
exports.createBookIssue = async (req, res) => {
  try {
    const bookIssue = new BookIssue(req.body);
    await bookIssue.save();
    res.status(201).json(bookIssue);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all book issues
exports.getBookIssues = async (req, res) => {
  try {
    const bookIssues = await BookIssue.find().populate('book_id');
    res.json(bookIssues);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get a book issue by ID
exports.getBookIssueById = async (req, res) => {
  try {
    const bookIssue = await BookIssue.findById(req.params.id).populate('book_id');
    if (!bookIssue) return res.status(404).json({ error: 'BookIssue not found' });
    res.json(bookIssue);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update a book issue
exports.updateBookIssue = async (req, res) => {
  try {
    const bookIssue = await BookIssue.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!bookIssue) return res.status(404).json({ error: 'BookIssue not found' });
    res.json(bookIssue);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete a book issue
exports.deleteBookIssue = async (req, res) => {
  try {
    const bookIssue = await BookIssue.findByIdAndDelete(req.params.id);
    if (!bookIssue) return res.status(404).json({ error: 'BookIssue not found' });
    res.json({ message: 'BookIssue deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
