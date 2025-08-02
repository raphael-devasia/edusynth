const Hostel = require('../models/Hostel');

// Create a new hostel
exports.createHostel = async (req, res) => {
  try {
    const hostel = new Hostel(req.body);
    await hostel.save();
    res.status(201).json(hostel);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all hostels or by ID
exports.getHostels = async (req, res) => {
  try {
    const { id } = req.query;
    if (id) {
      const hostel = await Hostel.findById(id);
      if (!hostel) return res.status(404).json({ error: 'Hostel not found' });
      res.json(hostel);
    } else {
      const hostels = await Hostel.find();
      res.json(hostels);
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update a hostel
exports.updateHostel = async (req, res) => {
  try {
    const hostel = await Hostel.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!hostel) return res.status(404).json({ error: 'Hostel not found' });
    res.json(hostel);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete a hostel
exports.deleteHostel = async (req, res) => {
  try {
    const hostel = await Hostel.findByIdAndDelete(req.params.id);
    if (!hostel) return res.status(404).json({ error: 'Hostel not found' });
    res.json({ message: 'Hostel deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
