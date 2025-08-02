const SchoolHouse = require('../models/SchoolHouse');

// Create a new house
exports.createHouse = async (req, res) => {
  try {
    const house = new SchoolHouse(req.body);
    await house.save();
    res.status(201).json(house);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all houses
exports.getHouses = async (req, res) => {
  try {
    const houses = await SchoolHouse.find();
    res.json(houses);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get a house by ID
exports.getHouseById = async (req, res) => {
  try {
    const house = await SchoolHouse.findById(req.params.id);
    if (!house) return res.status(404).json({ error: 'House not found' });
    res.json(house);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update a house
exports.updateHouse = async (req, res) => {
  try {
    const house = await SchoolHouse.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!house) return res.status(404).json({ error: 'House not found' });
    res.json(house);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete a house
exports.deleteHouse = async (req, res) => {
  try {
    const house = await SchoolHouse.findByIdAndDelete(req.params.id);
    if (!house) return res.status(404).json({ error: 'House not found' });
    res.json({ message: 'House deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
