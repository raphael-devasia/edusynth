const Vehicle = require('../models/Vehicle');

// Create a new vehicle
exports.createVehicle = async (req, res) => {
  try {
    const vehicle = new Vehicle(req.body);
    await vehicle.save();
    res.status(201).json(vehicle);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all vehicles or a single vehicle by ID
exports.getVehicles = async (req, res) => {
  try {
    if (req.params.id) {
      const vehicle = await Vehicle.findById(req.params.id);
      if (!vehicle) return res.status(404).json({ error: 'Vehicle not found' });
      return res.json(vehicle);
    }
    const vehicles = await Vehicle.find();
    res.json(vehicles);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update a vehicle by ID
exports.updateVehicle = async (req, res) => {
  try {
    const vehicle = await Vehicle.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!vehicle) return res.status(404).json({ error: 'Vehicle not found' });
    res.json(vehicle);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete a vehicle by ID
exports.deleteVehicle = async (req, res) => {
  try {
    const vehicle = await Vehicle.findByIdAndDelete(req.params.id);
    if (!vehicle) return res.status(404).json({ error: 'Vehicle not found' });
    res.json({ message: 'Vehicle deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
