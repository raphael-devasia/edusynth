const PaymentMode = require('../models/PaymentMode');

// Create a new PaymentMode
exports.createPaymentMode = async (req, res) => {
  try {
    const paymentMode = new PaymentMode(req.body);
    await paymentMode.save();
    res.status(201).json(paymentMode);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all PaymentModes
exports.getAllPaymentModes = async (req, res) => {
  try {
    const paymentModes = await PaymentMode.find();
    res.json(paymentModes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get PaymentMode by ID
exports.getPaymentModeById = async (req, res) => {
  try {
    const paymentMode = await PaymentMode.findById(req.params.id);
    if (!paymentMode) return res.status(404).json({ error: 'PaymentMode not found' });
    res.json(paymentMode);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update PaymentMode
exports.updatePaymentMode = async (req, res) => {
  try {
    const paymentMode = await PaymentMode.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!paymentMode) return res.status(404).json({ error: 'PaymentMode not found' });
    res.json(paymentMode);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete PaymentMode
exports.deletePaymentMode = async (req, res) => {
  try {
    const paymentMode = await PaymentMode.findByIdAndDelete(req.params.id);
    if (!paymentMode) return res.status(404).json({ error: 'PaymentMode not found' });
    res.json({ message: 'PaymentMode deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
