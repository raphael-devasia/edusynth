const RoutePickupPoint = require('../models/RoutePickupPoint');

// Create a new route pickup point
exports.createRoutePickupPoint = async (req, res) => {
  try {
    const routePickupPoint = new RoutePickupPoint(req.body);
    await routePickupPoint.save();
    res.status(201).json(routePickupPoint);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all route pickup points or by ID
exports.getRoutePickupPoints = async (req, res) => {
  try {
    const { id } = req.query;
    if (id) {
      const routePickupPoint = await RoutePickupPoint.findById(id)
        .populate('route_id')
        .populate('pickup_point_id');
      if (!routePickupPoint) return res.status(404).json({ error: 'Route pickup point not found' });
      res.json(routePickupPoint);
    } else {
      const routePickupPoints = await RoutePickupPoint.find()
        .populate('route_id')
        .populate('pickup_point_id');
      res.json(routePickupPoints);
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update a route pickup point
exports.updateRoutePickupPoint = async (req, res) => {
  try {
    const routePickupPoint = await RoutePickupPoint.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!routePickupPoint) return res.status(404).json({ error: 'Route pickup point not found' });
    res.json(routePickupPoint);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete a route pickup point
exports.deleteRoutePickupPoint = async (req, res) => {
  try {
    const routePickupPoint = await RoutePickupPoint.findByIdAndDelete(req.params.id);
    if (!routePickupPoint) return res.status(404).json({ error: 'Route pickup point not found' });
    res.json({ message: 'Route pickup point deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
