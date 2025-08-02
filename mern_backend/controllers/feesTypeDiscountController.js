const FeesTypeDiscount = require('../models/FeesTypeDiscount');

// Create a new FeesTypeDiscount
exports.createFeesTypeDiscount = async (req, res) => {
  try {
    const feesTypeDiscount = new FeesTypeDiscount(req.body);
    await feesTypeDiscount.save();
    res.status(201).json(feesTypeDiscount);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all FeesTypeDiscounts
exports.getAllFeesTypeDiscounts = async (req, res) => {
  try {
    const feesTypeDiscounts = await FeesTypeDiscount.find()
      .populate('fees_type_id')
      .populate('discount_id');
    res.json(feesTypeDiscounts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get FeesTypeDiscount by ID
exports.getFeesTypeDiscountById = async (req, res) => {
  try {
    const feesTypeDiscount = await FeesTypeDiscount.findById(req.params.id)
      .populate('fees_type_id')
      .populate('discount_id');
    if (!feesTypeDiscount) return res.status(404).json({ error: 'FeesTypeDiscount not found' });
    res.json(feesTypeDiscount);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update FeesTypeDiscount
exports.updateFeesTypeDiscount = async (req, res) => {
  try {
    const feesTypeDiscount = await FeesTypeDiscount.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!feesTypeDiscount) return res.status(404).json({ error: 'FeesTypeDiscount not found' });
    res.json(feesTypeDiscount);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete FeesTypeDiscount
exports.deleteFeesTypeDiscount = async (req, res) => {
  try {
    const feesTypeDiscount = await FeesTypeDiscount.findByIdAndDelete(req.params.id);
    if (!feesTypeDiscount) return res.status(404).json({ error: 'FeesTypeDiscount not found' });
    res.json({ message: 'FeesTypeDiscount deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
