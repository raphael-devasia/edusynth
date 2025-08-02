const TransportFee = require('../models/TransportFee');

// Create a new transport fee
exports.createTransportFee = async (req, res) => {
  try {
    const transportFee = new TransportFee(req.body);
    await transportFee.save();
    res.status(201).json(transportFee);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all transport fees or by filter
exports.getTransportFees = async (req, res) => {
  try {
    const filter = req.query || {};
    const transportFees = await TransportFee.find(filter).populate('session_id');
    res.json(transportFees);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update a transport fee
exports.updateTransportFee = async (req, res) => {
  try {
    const transportFee = await TransportFee.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!transportFee) return res.status(404).json({ error: 'TransportFee not found' });
    res.json(transportFee);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete a transport fee
exports.deleteTransportFee = async (req, res) => {
  try {
    const transportFee = await TransportFee.findByIdAndDelete(req.params.id);
    if (!transportFee) return res.status(404).json({ error: 'TransportFee not found' });
    res.json({ message: 'TransportFee deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
