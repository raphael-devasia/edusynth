const TransportRoute = require('../models/TransportRoute');

// Create a new transport route
exports.createTransportRoute = async (req, res) => {
  try {
    const transportRoute = new TransportRoute(req.body);
    await transportRoute.save();
    res.status(201).json(transportRoute);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all transport routes or by ID
exports.getTransportRoutes = async (req, res) => {
  try {
    const { id } = req.query;
    if (id) {
      const transportRoute = await TransportRoute.findById(id);
      if (!transportRoute) return res.status(404).json({ error: 'Transport route not found' });
      res.json(transportRoute);
    } else {
      const transportRoutes = await TransportRoute.find();
      res.json(transportRoutes);
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update a transport route
exports.updateTransportRoute = async (req, res) => {
  try {
    const transportRoute = await TransportRoute.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!transportRoute) return res.status(404).json({ error: 'Transport route not found' });
    res.json(transportRoute);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete a transport route
exports.deleteTransportRoute = async (req, res) => {
  try {
    const transportRoute = await TransportRoute.findByIdAndDelete(req.params.id);
    if (!transportRoute) return res.status(404).json({ error: 'Transport route not found' });
    res.json({ message: 'Transport route deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
