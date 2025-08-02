const FeeType = require('../models/FeeType');

// Create a new fee type
exports.createFeeType = async (req, res) => {
  try {
    const feeType = new FeeType(req.body);
    await feeType.save();
    res.status(201).json(feeType);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all fee types or by ID
exports.getFeeTypes = async (req, res) => {
  try {
    const { id } = req.query;
    if (id) {
      const feeType = await FeeType.findById(id).populate('feecategory_id');
      if (!feeType) return res.status(404).json({ error: 'FeeType not found' });
      res.json(feeType);
    } else {
      const feeTypes = await FeeType.find().populate('feecategory_id');
      res.json(feeTypes);
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update a fee type
exports.updateFeeType = async (req, res) => {
  try {
    const feeType = await FeeType.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!feeType) return res.status(404).json({ error: 'FeeType not found' });
    res.json(feeType);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete a fee type
exports.deleteFeeType = async (req, res) => {
  try {
    const feeType = await FeeType.findByIdAndDelete(req.params.id);
    if (!feeType) return res.status(404).json({ error: 'FeeType not found' });
    res.json({ message: 'FeeType deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
