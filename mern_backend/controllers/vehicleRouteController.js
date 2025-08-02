const VehicleRoute = require('../models/VehicleRoute');

// Create a new vehicle route
exports.createVehicleRoute = async (req, res) => {
  try {
    const vehicleRoute = new VehicleRoute(req.body);
    await vehicleRoute.save();
    res.status(201).json(vehicleRoute);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all vehicle routes
exports.getVehicleRoutes = async (req, res) => {
  try {
    const vehicleRoutes = await VehicleRoute.find().populate('route_id').populate('vehicle_id');
    res.json(vehicleRoutes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get a single vehicle route by ID
exports.getVehicleRouteById = async (req, res) => {
  try {
    const vehicleRoute = await VehicleRoute.findById(req.params.id).populate('route_id').populate('vehicle_id');
    if (!vehicleRoute) return res.status(404).json({ error: 'Vehicle route not found' });
    res.json(vehicleRoute);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update a vehicle route
exports.updateVehicleRoute = async (req, res) => {
  try {
    const vehicleRoute = await VehicleRoute.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!vehicleRoute) return res.status(404).json({ error: 'Vehicle route not found' });
    res.json(vehicleRoute);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete a vehicle route
exports.deleteVehicleRoute = async (req, res) => {
  try {
    const vehicleRoute = await VehicleRoute.findByIdAndDelete(req.params.id);
    if (!vehicleRoute) return res.status(404).json({ error: 'Vehicle route not found' });
    res.json({ message: 'Vehicle route deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
