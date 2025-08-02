const FeeDiscount = require('../models/FeeDiscount');

// Create a new fee discount
exports.createFeeDiscount = async (req, res) => {
  try {
    const feeDiscount = new FeeDiscount(req.body);
    await feeDiscount.save();
    res.status(201).json(feeDiscount);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all fee discounts or by ID
exports.getFeeDiscounts = async (req, res) => {
  try {
    const { id } = req.query;
    if (id) {
      const feeDiscount = await FeeDiscount.findById(id);
      if (!feeDiscount) return res.status(404).json({ error: 'FeeDiscount not found' });
      res.json(feeDiscount);
    } else {
      const feeDiscounts = await FeeDiscount.find().sort({ _id: 1 });
      res.json(feeDiscounts);
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update a fee discount
exports.updateFeeDiscount = async (req, res) => {
  try {
    const feeDiscount = await FeeDiscount.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!feeDiscount) return res.status(404).json({ error: 'FeeDiscount not found' });
    res.json(feeDiscount);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete a fee discount
exports.deleteFeeDiscount = async (req, res) => {
  try {
    const feeDiscount = await FeeDiscount.findByIdAndDelete(req.params.id);
    if (!feeDiscount) return res.status(404).json({ error: 'FeeDiscount not found' });
    res.json({ message: 'FeeDiscount deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
