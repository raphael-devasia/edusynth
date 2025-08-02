const HostelRoom = require('../models/HostelRoom');

// Create a new hostel room
exports.createHostelRoom = async (req, res) => {
  try {
    const hostelRoom = new HostelRoom(req.body);
    await hostelRoom.save();
    res.status(201).json(hostelRoom);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all hostel rooms or by ID
exports.getHostelRooms = async (req, res) => {
  try {
    const { id } = req.query;
    if (id) {
      const hostelRoom = await HostelRoom.findById(id).populate('hostel_id');
      if (!hostelRoom) return res.status(404).json({ error: 'Hostel room not found' });
      res.json(hostelRoom);
    } else {
      const hostelRooms = await HostelRoom.find().populate('hostel_id');
      res.json(hostelRooms);
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update a hostel room
exports.updateHostelRoom = async (req, res) => {
  try {
    const hostelRoom = await HostelRoom.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!hostelRoom) return res.status(404).json({ error: 'Hostel room not found' });
    res.json(hostelRoom);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete a hostel room
exports.deleteHostelRoom = async (req, res) => {
  try {
    const hostelRoom = await HostelRoom.findByIdAndDelete(req.params.id);
    if (!hostelRoom) return res.status(404).json({ error: 'Hostel room not found' });
    res.json({ message: 'Hostel room deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
