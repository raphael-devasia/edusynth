const PickupPoint = require('../models/PickupPoint');

// Create a new pickup point
exports.createPickupPoint = async (req, res) => {
  try {
    const pickupPoint = new PickupPoint(req.body);
    await pickupPoint.save();
    res.status(201).json(pickupPoint);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all pickup points or by ID
exports.getPickupPoints = async (req, res) => {
  try {
    const { id } = req.query;
    if (id) {
      const pickupPoint = await PickupPoint.findById(id);
      if (!pickupPoint) return res.status(404).json({ error: 'Pickup point not found' });
      res.json(pickupPoint);
    } else {
      const pickupPoints = await PickupPoint.find();
      res.json(pickupPoints);
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update a pickup point
exports.updatePickupPoint = async (req, res) => {
  try {
    const pickupPoint = await PickupPoint.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!pickupPoint) return res.status(404).json({ error: 'Pickup point not found' });
    res.json(pickupPoint);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete a pickup point
exports.deletePickupPoint = async (req, res) => {
  try {
    const pickupPoint = await PickupPoint.findByIdAndDelete(req.params.id);
    if (!pickupPoint) return res.status(404).json({ error: 'Pickup point not found' });
    res.json({ message: 'Pickup point deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
