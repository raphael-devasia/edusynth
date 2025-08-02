const Librarian = require('../models/Librarian');

// Create a new librarian
exports.createLibrarian = async (req, res) => {
  try {
    const librarian = new Librarian(req.body);
    await librarian.save();
    res.status(201).json(librarian);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all librarians or by ID
exports.getLibrarians = async (req, res) => {
  try {
    const { id } = req.query;
    if (id) {
      const librarian = await Librarian.findById(id).populate('user_id');
      if (!librarian) return res.status(404).json({ error: 'Librarian not found' });
      res.json(librarian);
    } else {
      const librarians = await Librarian.find().populate('user_id');
      res.json(librarians);
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update a librarian
exports.updateLibrarian = async (req, res) => {
  try {
    const librarian = await Librarian.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!librarian) return res.status(404).json({ error: 'Librarian not found' });
    res.json(librarian);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete a librarian
exports.deleteLibrarian = async (req, res) => {
  try {
    const librarian = await Librarian.findByIdAndDelete(req.params.id);
    if (!librarian) return res.status(404).json({ error: 'Librarian not found' });
    res.json({ message: 'Librarian deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
