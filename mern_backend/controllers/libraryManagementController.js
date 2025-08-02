const LibraryManagement = require('../models/LibraryManagement');

// Create a new library member
exports.createLibraryMember = async (req, res) => {
  try {
    const member = new LibraryManagement(req.body);
    await member.save();
    res.status(201).json(member);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all library members or by ID
exports.getLibraryMembers = async (req, res) => {
  try {
    const { id } = req.query;
    if (id) {
      const member = await LibraryManagement.findById(id);
      if (!member) return res.status(404).json({ error: 'Library member not found' });
      res.json(member);
    } else {
      const members = await LibraryManagement.find().sort({ _id: 1 });
      res.json(members);
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update a library member
exports.updateLibraryMember = async (req, res) => {
  try {
    const member = await LibraryManagement.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!member) return res.status(404).json({ error: 'Library member not found' });
    res.json(member);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete a library member
exports.deleteLibraryMember = async (req, res) => {
  try {
    const member = await LibraryManagement.findByIdAndDelete(req.params.id);
    if (!member) return res.status(404).json({ error: 'Library member not found' });
    res.json({ message: 'Library member deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
