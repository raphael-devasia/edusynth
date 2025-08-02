const FeeCategory = require('../models/FeeCategory');

// Create a new fee category
exports.createFeeCategory = async (req, res) => {
  try {
    const category = new FeeCategory(req.body);
    await category.save();
    res.status(201).json(category);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all fee categories
exports.getFeeCategories = async (req, res) => {
  try {
    const categories = await FeeCategory.find();
    res.json(categories);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get a fee category by ID
exports.getFeeCategoryById = async (req, res) => {
  try {
    const category = await FeeCategory.findById(req.params.id);
    if (!category) return res.status(404).json({ error: 'Fee Category not found' });
    res.json(category);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update a fee category
exports.updateFeeCategory = async (req, res) => {
  try {
    const category = await FeeCategory.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!category) return res.status(404).json({ error: 'Fee Category not found' });
    res.json(category);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete a fee category
exports.deleteFeeCategory = async (req, res) => {
  try {
    const category = await FeeCategory.findByIdAndDelete(req.params.id);
    if (!category) return res.status(404).json({ error: 'Fee Category not found' });
    res.json({ message: 'Fee Category deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
