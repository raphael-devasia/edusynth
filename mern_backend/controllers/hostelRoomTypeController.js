const HostelRoomType = require('../models/HostelRoomType');

// Create a new HostelRoomType
exports.createHostelRoomType = async (req, res) => {
  try {
    const hostelRoomType = new HostelRoomType(req.body);
    await hostelRoomType.save();
    res.status(201).json(hostelRoomType);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all HostelRoomTypes
exports.getAllHostelRoomTypes = async (req, res) => {
  try {
    const hostelRoomTypes = await HostelRoomType.find();
    res.json(hostelRoomTypes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get HostelRoomType by ID
exports.getHostelRoomTypeById = async (req, res) => {
  try {
    const hostelRoomType = await HostelRoomType.findById(req.params.id);
    if (!hostelRoomType) return res.status(404).json({ error: 'HostelRoomType not found' });
    res.json(hostelRoomType);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update HostelRoomType
exports.updateHostelRoomType = async (req, res) => {
  try {
    const hostelRoomType = await HostelRoomType.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!hostelRoomType) return res.status(404).json({ error: 'HostelRoomType not found' });
    res.json(hostelRoomType);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete HostelRoomType
exports.deleteHostelRoomType = async (req, res) => {
  try {
    const hostelRoomType = await HostelRoomType.findByIdAndDelete(req.params.id);
    if (!hostelRoomType) return res.status(404).json({ error: 'HostelRoomType not found' });
    res.json({ message: 'HostelRoomType deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
