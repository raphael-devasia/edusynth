const RoomType = require('../models/RoomType');

// Create a new room type
exports.createRoomType = async (req, res) => {
  try {
    const roomType = new RoomType(req.body);
    await roomType.save();
    res.status(201).json(roomType);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all room types
exports.getAllRoomTypes = async (req, res) => {
  try {
    const roomTypes = await RoomType.find();
    res.json(roomTypes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get a room type by ID
exports.getRoomTypeById = async (req, res) => {
  try {
    const roomType = await RoomType.findById(req.params.id);
    if (!roomType) return res.status(404).json({ error: 'RoomType not found' });
    res.json(roomType);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update a room type
exports.updateRoomType = async (req, res) => {
  try {
    const roomType = await RoomType.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!roomType) return res.status(404).json({ error: 'RoomType not found' });
    res.json(roomType);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete a room type
exports.deleteRoomType = async (req, res) => {
  try {
    const roomType = await RoomType.findByIdAndDelete(req.params.id);
    if (!roomType) return res.status(404).json({ error: 'RoomType not found' });
    res.json({ message: 'RoomType deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
