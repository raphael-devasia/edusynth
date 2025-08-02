const FeesPayment = require('../models/FeesPayment');

// Create a new FeesPayment
exports.createFeesPayment = async (req, res) => {
  try {
    const feesPayment = new FeesPayment(req.body);
    await feesPayment.save();
    res.status(201).json(feesPayment);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all FeesPayments
exports.getAllFeesPayments = async (req, res) => {
  try {
    const feesPayments = await FeesPayment.find()
      .populate('student_id')
      .populate('fees_type_id');
    res.json(feesPayments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get FeesPayment by ID
exports.getFeesPaymentById = async (req, res) => {
  try {
    const feesPayment = await FeesPayment.findById(req.params.id)
      .populate('student_id')
      .populate('fees_type_id');
    if (!feesPayment) return res.status(404).json({ error: 'FeesPayment not found' });
    res.json(feesPayment);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update FeesPayment
exports.updateFeesPayment = async (req, res) => {
  try {
    const feesPayment = await FeesPayment.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!feesPayment) return res.status(404).json({ error: 'FeesPayment not found' });
    res.json(feesPayment);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete FeesPayment
exports.deleteFeesPayment = async (req, res) => {
  try {
    const feesPayment = await FeesPayment.findByIdAndDelete(req.params.id);
    if (!feesPayment) return res.status(404).json({ error: 'FeesPayment not found' });
    res.json({ message: 'FeesPayment deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
